'use client'
import { useEffect, useRef, useState } from 'react'
import { getUser, getValidToken } from '@/src/lib/auth'
import { apiFetch } from '@/src/lib/api'
import LiveMap from '@/src/components/LiveMap'

type TripResp = { ok: boolean, trip: { id: string, status: string } }

export default function RiderRequest() {
  const [city, setCity] = useState('Guayaquil')
  const [origin, setOrigin] = useState<{ lat: number, lng: number } | null>(null)
  const [dest, setDest] = useState<{ lat: number, lng: number } | null>(null)
  const [method, setMethod] = useState<'CASH'|'CARD'>('CASH')
  const [estim, setEstim] = useState<{ distanceKm: number, durationMin: number, priceUsd: number } | null>(null)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Array<{ display_name: string, lat: string, lon: string }>>([])
  const [searchTarget, setSearchTarget] = useState<'origin'|'dest'>('origin')
  const [home, setHome] = useState<{ lat: number, lng: number } | null>(null)
  const [work, setWork] = useState<{ lat: number, lng: number } | null>(null)

  useEffect(() => { const u = getUser(); if (!u) location.href = '/rider/login' }, [])

  // Load saved payment preference
  useEffect(() => {
    try {
      const m = localStorage.getItem('rider_payment_method')
      if (m === 'CASH' || m === 'CARD') setMethod(m)
    } catch {}
  }, [])

  // Persist payment preference
  useEffect(() => {
    try { localStorage.setItem('rider_payment_method', method) } catch {}
  }, [method])

  useEffect(() => {
    if (!origin || !dest) { setEstim(null); return }
    const dKm = haversine(origin.lat, origin.lng, dest.lat, dest.lng)
    const dur = Math.max(5, Math.round(dKm * 4)) // 15 km/h aprox por defecto
    // Estimación simple (reemplazar por endpoint de pricing cuando esté disponible)
    const base = 1.5, perKm = 0.5, perMin = 0.2, minFare = 2.0
    const raw = base + perKm * dKm + perMin * dur
    const price = Math.max(minFare, raw)
    setEstim({ distanceKm: Number(dKm.toFixed(2)), durationMin: dur, priceUsd: Number(price.toFixed(2)) })
  }, [JSON.stringify(origin), JSON.stringify(dest)])

  // Cargar favoritos desde localStorage
  useEffect(() => {
    try { const h = localStorage.getItem('fav_home'); if (h) setHome(JSON.parse(h)) } catch {}
    try { const w = localStorage.getItem('fav_work'); if (w) setWork(JSON.parse(w)) } catch {}
  }, [])

  // Búsqueda con debounce usando Nominatim
  useEffect(() => {
    let cancel = false
    const q = searchTerm.trim()
    if (!q) { setSearchResults([]); return }
    const t = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=5&q=${encodeURIComponent(q)}`
        const res = await fetch(url, { headers: { 'Accept-Language': 'es' } })
        if (!res.ok) return
        const body = await res.json()
        if (!cancel) setSearchResults(Array.isArray(body) ? body : [])
      } catch { if (!cancel) setSearchResults([]) }
    }, 400)
    return () => { cancel = true; clearTimeout(t) }
  }, [searchTerm])

  async function createTrip() {
    if (!origin || !dest) return
    setCreating(true); setError(null)
    try {
      const token = getValidToken(); if (!token) { location.href = '/rider/login'; return }
      const body: any = { city, pickupLat: origin.lat, pickupLng: origin.lng, dropoffLat: dest.lat, dropoffLng: dest.lng, distanceKm: estim?.distanceKm || 3, durationMin: estim?.durationMin || 10, preferredMethod: method }
      const resp = await apiFetch<TripResp>(`/trips/request`, { method: 'POST', body: JSON.stringify(body) }, token)
      location.href = `/rider/trip/${resp.trip.id}`
    } catch (e: any) { setError(e?.message || 'Error al solicitar') } finally { setCreating(false) }
  }

  return (
    <div>
      <h2>Solicitar viaje</h2>
      <div className="row" style={{gap:12, flexWrap:'wrap', alignItems:'center'}}>
        <label>
          <div className="muted">Ciudad</div>
          <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Guayaquil" />
        </label>
        <label className="row" style={{gap:6, alignItems:'center'}}>
          <span>Método</span>
          <select value={method} onChange={e=>setMethod(e.target.value as any)}>
            <option value="CASH">CASH</option>
            <option value="CARD">CARD</option>
          </select>
        </label>
        <button className="btn" onClick={createTrip} disabled={!origin || !dest || creating}>{creating?'Solicitando…':'Solicitar'}</button>
      </div>
      <div className="card" style={{marginTop:10}}>
        <div className="row" style={{gap:8, flexWrap:'wrap'}}>
          <label>
            <div className="muted">Origen (click en mapa)</div>
            <input readOnly value={origin ? `${origin.lat.toFixed(6)}, ${origin.lng.toFixed(6)}` : ''} />
          </label>
          <div className="row" style={{gap:8, alignItems:'center'}}>
            <label className="row" style={{gap:6, alignItems:'center'}}>
              <span>Buscar</span>
              <input placeholder="Dirección, punto de interés…" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} style={{minWidth:260}} />
            </label>
            <label className="row" style={{gap:6, alignItems:'center'}}>
              <span>Aplicar a</span>
              <select value={searchTarget} onChange={e=>setSearchTarget(e.target.value as any)}>
                <option value="origin">Origen</option>
                <option value="dest">Destino</option>
              </select>
            </label>
            {searchResults.length > 0 && (
              <div className="card" style={{padding:8}}>
                <ul style={{listStyle:'none', padding:0, margin:0}}>
                  {searchResults.map((r, i) => (
                    <li key={i}>
                      <button className="btn secondary" onClick={() => { const p = { lat: Number(r.lat), lng: Number(r.lon) }; if (searchTarget==='origin') setOrigin(p); else setDest(p); setSearchResults([]); setSearchTerm('') }}>{r.display_name}</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="row" style={{gap:8, alignItems:'center'}}>
            <span className="muted">Favoritos:</span>
            <button className="btn secondary" onClick={() => home && (searchTarget==='origin' ? setOrigin(home) : setDest(home))} disabled={!home}>Casa</button>
            <button className="btn secondary" onClick={() => work && (searchTarget==='origin' ? setOrigin(work) : setDest(work))} disabled={!work}>Trabajo</button>
            <button className="btn secondary" onClick={() => { const p = searchTarget==='origin' ? origin : dest; if (p) { localStorage.setItem('fav_home', JSON.stringify(p)); setHome(p) } }}>Guardar Casa</button>
            <button className="btn secondary" onClick={() => { const p = searchTarget==='origin' ? origin : dest; if (p) { localStorage.setItem('fav_work', JSON.stringify(p)); setWork(p) } }}>Guardar Trabajo</button>
          </div>
          <label>
            <div className="muted">Destino (clic derecho/Alt)</div>
            <input readOnly value={dest ? `${dest.lat.toFixed(6)}, ${dest.lng.toFixed(6)}` : ''} />
          </label>
          {estim && (
            <div className="row" style={{gap:12}}>
              <span className="muted">Dist: {estim.distanceKm} km</span>
              <span className="muted">Dur: {estim.durationMin} min</span>
              <span>Estimado: <strong>${estim.priceUsd.toFixed(2)}</strong></span>
              <span className="muted">Pago: {method}</span>
            </div>
          )}
          {error && <div style={{color:'var(--danger)'}}>{error}</div>}
        </div>
        <div style={{height:360, marginTop:10}}>
          <PickMap onPick={setOrigin} onPickAlt={setDest} />
        </div>
      </div>
    </div>
  )
}

function PickMap({ onPick, onPickAlt }: { onPick: (p:{lat:number,lng:number})=>void, onPickAlt: (p:{lat:number,lng:number})=>void }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<{ o?: any, d?: any }>({})
  useEffect(() => { let c=false; (async()=>{ await injectLeaflet(); if(c) return; init() })(); return ()=>{c=true} }, [])
  function init() {
    const L = (window as any).L; if (!L || !ref.current) return
    const map = L.map(ref.current)
    map.setView([-2.170998, -79.922359], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map)
    mapRef.current = map
    map.on('click', (e: any) => { onPick({ lat: e.latlng.lat, lng: e.latlng.lng }); mark('o', e.latlng, '#22c55e') })
    map.on('contextmenu', (e: any) => { onPickAlt({ lat: e.latlng.lat, lng: e.latlng.lng }); mark('d', e.latlng, '#ef4444') })
  }
  function mark(kind: 'o'|'d', pos: any, color: string) {
    const L = (window as any).L; const map = mapRef.current; if (!L || !map) return
    const m = markersRef.current
    if (!m[kind]) { m[kind] = L.circleMarker([pos.lat, pos.lng], { radius: 8, color, fillColor: color, fillOpacity: 0.6 }).addTo(map) } else { m[kind].setLatLng([pos.lat, pos.lng]) }
  }
  return <div ref={ref} style={{ width:'100%', height:'100%' }} />
}

function haversine(lat1:number, lon1:number, lat2:number, lon2:number) {
  const R = 6371
  const toRad = (deg:number)=>deg*Math.PI/180
  const dLat = toRad(lat2-lat1)
  const dLon = toRad(lon2-lon1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2
  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R*c
}

function injectLeaflet(): Promise<void> { return new Promise((resolve) => { if ((window as any).L) return resolve(); const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link); const script = document.createElement('script'); script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; script.async = true; script.defer = true; script.onload = () => resolve(); script.onerror = () => resolve(); document.body.appendChild(script) }) }
