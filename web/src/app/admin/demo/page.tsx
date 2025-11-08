'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import LiveMap from '@/src/components/LiveMap'
import { connectSSE } from '@/src/lib/sse'
import { apiFetch, API_BASE } from '@/src/lib/api'
import { getValidToken } from '@/src/lib/auth'
import { useToast } from '@/src/components/Toast'

type Trip = { id: string, status: string, pickupLat?: number, pickupLng?: number, dropoffLat?: number, dropoffLng?: number, city?: string|null }

export default function DemoPage() {
  const { show } = useToast()
  const search = useSearchParams()
  const [city, setCity] = useState('Guayaquil')
  const [origin, setOrigin] = useState<{ lat: number, lng: number } | null>({ lat: -2.170998, lng: -79.922359 })
  const [dest, setDest] = useState<{ lat: number, lng: number } | null>({ lat: -2.185, lng: -79.90 })
  const [trip, setTrip] = useState<Trip | null>(null)
  const [events, setEvents] = useState<any[]>([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    // Prefill from query params if present
    try {
      const c = search.get('city'); if (c) setCity(c)
      const olat = search.get('olat'), olng = search.get('olng')
      const dlat = search.get('dlat'), dlng = search.get('dlng')
      if (olat && olng) setOrigin({ lat: Number(olat), lng: Number(olng) })
      if (dlat && dlng) setDest({ lat: Number(dlat), lng: Number(dlng) })
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function doSeed() {
    setBusy(true)
    const token = getValidToken(); if (!token) return alert('Inicia sesión')
    try {
      const res = await fetch(`${API_BASE}/admin/demo/seed`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      alert('Demo seeded: usuarios y tarifas listos (pwd 123456)')
      show('Demo seeded: usuarios y tarifas listos (pwd 123456)', 'success')
    } catch (e: any) { alert(e?.message || 'Error') } finally { setBusy(false) }
  }

  async function doReset() {
    setBusy(true)
    const token = getValidToken(); if (!token) return alert('Inicia sesión')
    try {
      const res = await fetch(`${API_BASE}/admin/demo/reset`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setTrip(null); setEvents([])
      alert('Demo reseteada')
      show('Demo reseteada', 'success')
    } catch (e: any) { alert(e?.message || 'Error') } finally { setBusy(false) }
  }

  async function requestTrip() {
    if (!origin || !dest) return alert('Define origen y destino')
    setBusy(true)
    try {
      const token = getValidToken(); if (!token) return alert('Inicia sesión')
      const body = { city, pickupLat: origin.lat, pickupLng: origin.lng, dropoffLat: dest.lat, dropoffLng: dest.lng, distanceKm: 3.2, durationMin: 10 }
      const resp = await apiFetch<{ ok: boolean, trip: { id: string, status: string } }>(`/trips/request`, { method: 'POST', body: JSON.stringify(body) }, token)
      setTrip({ id: resp.trip.id, status: resp.trip.status, pickupLat: origin.lat, pickupLng: origin.lng, dropoffLat: dest.lat, dropoffLng: dest.lng, city })
      attachSSE(resp.trip.id)
      show('Viaje solicitado', 'success')
    } catch (e: any) { alert(e?.message || 'Error') } finally { setBusy(false) }
  }

  async function assignDriver() {
    if (!trip) return
    const token = getValidToken(); if (!token) return alert('Inicia sesión')
    await fetch(`${API_BASE}/admin/demo/trips/${encodeURIComponent(trip.id)}/assign-driver`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } })
    show('Driver asignado', 'success')
  }
  async function advance(to: 'ACCEPTED'|'ARRIVED'|'STARTED'|'COMPLETED') {
    if (!trip) return
    const token = getValidToken(); if (!token) return alert('Inicia sesión')
    await fetch(`${API_BASE}/admin/demo/trips/${encodeURIComponent(trip.id)}/advance`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ to }) })
    show(`Avanzado a ${to}`, 'success')
  }

  function attachSSE(id: string) {
    const token = getValidToken(); if (!token) return
    connectSSE(`${API_BASE}/trips/${encodeURIComponent(id)}/sse`, {
      token,
      onEvent: (ev) => {
        setEvents(prev => [ev, ...prev].slice(0,50))
        if (ev?.data?.status) setTrip(t => t ? { ...t, status: ev.data.status } : t)
      }
    }).catch(() => {})
  }

  return (
    <div>
      <h2>Demo de Viaje</h2>
      <div className="muted" style={{marginBottom:8}}>
        ¿Necesitas guía? Revisa <a href="/admin/readme">/admin/readme</a>
      </div>
      <div className="row" style={{gap:8, flexWrap:'wrap'}}>
        <label>
          <div className="muted">Ciudad</div>
          <input value={city} onChange={e=>setCity(e.target.value)} />
        </label>
        <button className="btn secondary" onClick={doSeed} disabled={busy}>Start Demo (seed)</button>
        <button className="btn secondary" onClick={doReset} disabled={busy}>Reset Demo</button>
      </div>
      <div className="card" style={{marginTop:10}}>
        <div className="row" style={{gap:8, flexWrap:'wrap'}}>
          <label>
            <div className="muted">Origen (click en mapa)</div>
            <input type="text" value={origin ? `${origin.lat.toFixed(6)}, ${origin.lng.toFixed(6)}` : ''} readOnly />
          </label>
          <label>
            <div className="muted">Destino (click en mapa con ALT)</div>
            <input type="text" value={dest ? `${dest.lat.toFixed(6)}, ${dest.lng.toFixed(6)}` : ''} readOnly />
          </label>
          <button className="btn" onClick={requestTrip} disabled={busy || !origin || !dest}>Solicitar viaje</button>
          <button className="btn secondary" onClick={assignDriver} disabled={!trip}>Asignar driver</button>
          <button className="btn secondary" onClick={() => advance('ACCEPTED')} disabled={!trip}>Aceptar</button>
          <button className="btn secondary" onClick={() => advance('ARRIVED')} disabled={!trip}>Llegar</button>
          <button className="btn secondary" onClick={() => advance('STARTED')} disabled={!trip}>Iniciar</button>
          <button className="btn secondary" onClick={() => advance('COMPLETED')} disabled={!trip}>Completar</button>
        </div>
        <div style={{height:360, marginTop:10}}>
          <MapPicker origin={origin} dest={dest} onPick={(o) => setOrigin(o)} onPickAlt={(d) => setDest(d)} />
        </div>
      </div>
      {trip && (
        <div className="card" style={{marginTop:10}}>
          <strong>Trip {trip.id}</strong>
          <div className="muted">Status: {trip.status}</div>
          <LiveMap origin={origin || (trip.pickupLat && trip.pickupLng ? { lat: Number(trip.pickupLat), lng: Number(trip.pickupLng) } : null)} destination={dest || (trip.dropoffLat && trip.dropoffLng ? { lat: Number(trip.dropoffLat), lng: Number(trip.dropoffLng) } : null)} height={300} />
          <div style={{marginTop:10}}>
            <strong>Eventos</strong>
            {events.length === 0 ? <div className="muted">Sin eventos aún.</div> : (
              <ul style={{listStyle:'none', padding:0}}>{events.map((e,i)=>(<li key={i} className="card" style={{marginTop:6}}><div className="muted">{e.event}</div><pre>{JSON.stringify(e.data, null, 2)}</pre></li>))}</ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function MapPicker({ origin, dest, onPick, onPickAlt }: { origin: any, dest: any, onPick: (p: {lat: number, lng: number}) => void, onPickAlt: (p: {lat: number, lng: number}) => void }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<{ o?: any, d?: any }>({})
  useEffect(() => { let c=false; (async()=>{ await injectLeaflet(); if(c) return; init() })(); return ()=>{c=true} }, [])
  useEffect(() => { if (mapRef.current && origin) updateMarker('o', origin, '#22c55e') }, [JSON.stringify(origin)])
  useEffect(() => { if (mapRef.current && dest) updateMarker('d', dest, '#ef4444') }, [JSON.stringify(dest)])
  function init() {
    const L = (window as any).L; if (!L || !ref.current) return
    const map = L.map(ref.current)
    map.setView([origin?.lat ?? -2.170998, origin?.lng ?? -79.922359], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map)
    mapRef.current = map
    map.on('click', (e: any) => onPick({ lat: e.latlng.lat, lng: e.latlng.lng }))
    map.on('contextmenu', (e: any) => onPickAlt({ lat: e.latlng.lat, lng: e.latlng.lng }))
  }
  function updateMarker(kind: 'o'|'d', pos: {lat:number,lng:number}, color: string) {
    const L = (window as any).L; const map = mapRef.current; if (!L || !map) return
    const m = markersRef.current
    if (!m[kind]) { m[kind] = L.circleMarker([pos.lat, pos.lng], { radius: 8, color, fillColor: color, fillOpacity: 0.6 }).addTo(map) } else { m[kind].setLatLng([pos.lat, pos.lng]) }
  }
  return <div ref={ref} style={{ width:'100%', height:'100%' }} />
}

function injectLeaflet(): Promise<void> { return new Promise((resolve) => { if ((window as any).L) return resolve(); const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link); const script = document.createElement('script'); script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; script.async = true; script.defer = true; script.onload = () => resolve(); script.onerror = () => resolve(); document.body.appendChild(script) }) }
