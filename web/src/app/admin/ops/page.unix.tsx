'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import OpsMap from '@/src/components/OpsMap'
import { apiFetch, API_BASE } from '@/src/lib/api'
import { connectSSE } from '@/src/lib/sse'
import { getUser, getValidToken } from '@/src/lib/auth'

type Trip = { id: string, status: string, city?: string|null, origin?: any, destination?: any, pickupLat?: number, pickupLng?: number, dropoffLat?: number, dropoffLng?: number, driverId?: string|null }
type TripsResp = { items: Trip[], nextCursor?: string }
type DriverSnap = { id: string, status?: string, lat: number|null, lng: number|null, at?: string|null }

export default function OpsPage() {
  const router = useRouter()
  const search = useSearchParams()
  const hasInit = useRef(false)
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [useSse, setUseSse] = useState(true)
  const [city, setCity] = useState<string>('')
  const [drivers, setDrivers] = useState<DriverSnap[]>([])
  const [selected, setSelected] = useState<{ type: 'trip'|'driver', id: string } | null>(null)
  const [selectedTripDetail, setSelectedTripDetail] = useState<any | null>(null)

  const [follow, setFollow] = useState<boolean>(true)
  const [tripStates, setTripStates] = useState<string[]>(['REQUESTED','ASSIGNED','ACCEPTED','ARRIVED','STARTED'])
  const [driverStates, setDriverStates] = useState<string[]>(['IDLE','ON_TRIP','ASSIGNED','ARRIVED'])
  const [center, setCenter] = useState<{ lat: number, lng: number, zoom?: number } | null>(null)
  const [cities, setCities] = useState<Array<{ key: string, name: string, center: { lat: number, lng: number }, zoom?: number, bounds?: { sw: { lat: number, lng: number }, ne: { lat: number, lng: number } } }>>([])
  const [bounds, setBounds] = useState<{ sw: { lat: number, lng: number }, ne: { lat: number, lng: number } } | null>(null)
  const activeTrips = useMemo(() => trips.filter(t => t.status !== 'COMPLETED' && t.status !== 'CANCELED' && (!city || (t.city || '').toLowerCase() === city.toLowerCase()) && (tripStates.length === 0 || tripStates.includes(t.status))), [trips, city, tripStates])

  useEffect(() => {
    if (!hasInit.current) {
      hasInit.current = true
      try {
        const q = new URLSearchParams(search as any)
        const saved = JSON.parse(localStorage.getItem('ops_filters') || '{}')
        const vCity = q.get('city') ?? saved.city
        if (vCity) setCity(vCity)
        const cLat = q.get('centerLat'); const cLng = q.get('centerLng'); const cZoom = q.get('centerZoom')
        if (cLat && cLng) setCenter({ lat: Number(cLat), lng: Number(cLng), zoom: cZoom ? Number(cZoom) : 12 })
        const swLat = q.get('swLat'), swLng = q.get('swLng'), neLat = q.get('neLat'), neLng = q.get('neLng')
        if (swLat && swLng && neLat && neLng) {
          setBounds({ sw: { lat: Number(swLat), lng: Number(swLng) }, ne: { lat: Number(neLat), lng: Number(neLng) } })
          setCenter(null)
        }
        // Fallback to saved center/bounds if URL params absent
        if (!cLat && !swLat && saved.center && typeof saved.center.lat === 'number' && typeof saved.center.lng === 'number') {
          setCenter({ lat: Number(saved.center.lat), lng: Number(saved.center.lng), zoom: saved.center.zoom ? Number(saved.center.zoom) : 12 })
        }
        if (!swLat && saved.bounds && saved.bounds.sw && saved.bounds.ne) {
          setBounds({ sw: { lat: Number(saved.bounds.sw.lat), lng: Number(saved.bounds.sw.lng) }, ne: { lat: Number(saved.bounds.ne.lat), lng: Number(saved.bounds.ne.lng) } })
          setCenter(null)
        }
        const vTrip = q.get('trip') ?? (Array.isArray(saved.trip) ? saved.trip.join(',') : undefined)
        if (vTrip) setTripStates(String(vTrip).split(',').filter(Boolean))
        const vDriver = q.get('driver') ?? (Array.isArray(saved.driver) ? saved.driver.join(',') : undefined)
        if (vDriver) setDriverStates(String(vDriver).split(',').filter(Boolean))
        const vSse = q.get('sse') ?? (saved.useSse ? '1' : '0')
        setUseSse(String(vSse) === '1')
        const vFollow = q.get('follow') ?? (saved.follow ? '1' : '0')
        setFollow(String(vFollow) === '1')
      } catch {}
    }
    const user = getUser()
    if (!user) { location.replace('/login'); return }
    if (user.role !== 'ADMIN') { setError('Acceso solo para ADMIN'); setLoading(false); return }
    const token = getValidToken()
    if (!token) { location.replace('/login'); return }
    setLoading(true)
    ;(async () => {
      try {
        const [tripsResp, driversResp] = await Promise.all([
          fetch(`${API_BASE}/admin/ops/active-trips${city ? `?city=${encodeURIComponent(city)}` : ''}`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }).then(r => r.json()).catch(() => ({ items: [] })),
          fetch(`${API_BASE}/admin/ops/active-drivers`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }).then(r => r.json()).catch(() => ({ items: [] })),
        ])
        setTrips((tripsResp.items || []) as Trip[])
        const snaps: DriverSnap[] = (driversResp.items || []).map((d: any) => ({ id: d.userId, status: d.status, lat: d.lat ?? null, lng: d.lng ?? null, at: d.locationUpdatedAt ?? null }))
        setDrivers(snaps)
        fetch(`${API_BASE}/admin/ops/cities`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
          .then(r => r.ok ? r.json() : { items: [] })
          .then(body => { if (Array.isArray(body.items)) setCities(body.items) })
          .catch(() => {})
      } catch (e: any) {
        setError(e?.message || 'Error al cargar datos de operaciones')
      } finally { setLoading(false) }
    })()
  }, [])

  // Persist filters to URL and localStorage
  useEffect(() => {
    const p = new URLSearchParams()
    if (city) p.set('city', city)
    if (tripStates.length) p.set('trip', tripStates.join(','))
    if (driverStates.length) p.set('driver', driverStates.join(','))
    p.set('sse', useSse ? '1' : '0')
    p.set('follow', follow ? '1' : '0')
    // Center/bounds state
    if (bounds && bounds.sw && bounds.ne) {
      p.set('swLat', String(bounds.sw.lat)); p.set('swLng', String(bounds.sw.lng))
      p.set('neLat', String(bounds.ne.lat)); p.set('neLng', String(bounds.ne.lng))
    } else if (center) {
      p.set('centerLat', String(center.lat)); p.set('centerLng', String(center.lng))
      if (center.zoom) p.set('centerZoom', String(center.zoom))
    }
    const qs = p.toString()
    router.replace((`/admin/ops${qs ? `?${qs}` : ''}`) as any)
    try { localStorage.setItem('ops_filters', JSON.stringify({ city, trip: tripStates, driver: driverStates, useSse, follow, center, bounds })) } catch {}
  }, [city, tripStates, driverStates, useSse, follow, center, bounds])

  useEffect(() => {
    if (!autoRefresh) return
    let cancelled = false
    const tick = async () => {
      const token = getValidToken()
      if (!token) return
      try {
        if (useSse) {
          const ctrl = new AbortController()
          const url = `${API_BASE}/admin/ops/sse${city ? `?city=${encodeURIComponent(city)}` : ''}`
          connectSSE(url, {
            token,
            signal: ctrl.signal,
            onEvent: (ev) => {
              if ((ev.event || '').toUpperCase() === 'SNAPSHOT') {
                const data = ev.data || {}
                if (data.trips) setTrips(data.trips)
                if (data.drivers) setDrivers(data.drivers)
              }
            }
          }).catch(() => {})
          return () => ctrl.abort()
        } else {
          const [tripsResp, driversResp] = await Promise.all([
            fetch(`${API_BASE}/admin/ops/active-trips${city ? `?city=${encodeURIComponent(city)}` : ''}`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }).then(r => r.json()).catch(() => ({ items: [] })),
            fetch(`${API_BASE}/admin/ops/active-drivers`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }).then(r => r.json()).catch(() => ({ items: [] })),
          ])
          if (cancelled) return
          setTrips((tripsResp.items || []) as Trip[])
          const snaps: DriverSnap[] = (driversResp.items || []).map((d: any) => ({ id: d.userId, status: d.status, lat: d.lat ?? null, lng: d.lng ?? null, at: d.locationUpdatedAt ?? null }))
          setDrivers(snaps)
        }
      } catch {}
    }
    if (useSse) {
      // SSE connection handles its own stream; set up and return abort
      const cleanup = tick()
      return () => { cancelled = true; if (typeof (cleanup as any) === 'function') (cleanup as any)(); }
    } else {
      const id = setInterval(tick, 10000)
      tick()
      return () => { cancelled = true; clearInterval(id) }
    }
  }, [autoRefresh, city, useSse])

  const tripPoints = activeTrips.map(t => ({ id: t.id, origin: getOrigin(t), destination: getDestination(t) }))
  const driverPoints = drivers.filter(d => driverStates.length === 0 || (d.status ? driverStates.includes(d.status) : true)).map(d => ({ id: d.id, pos: d.lat != null && d.lng != null ? { lat: d.lat, lng: d.lng } : null, status: d.status }))

  if (loading) return <div>Cargando mapa de operaciones…</div>
  if (error) return <div style={{color:'var(--danger)'}}>{error}</div>
  return (
    <div>
      <div className="muted" style={{marginBottom:6}}>Ayuda: <a href="/admin/readme">/admin/readme</a></div>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h2>Operaciones</h2>
        <div className="row" style={{gap:8, alignItems:'center', flexWrap:'wrap'}}>
          <label className="row" style={{gap:8}}>
            <span className="muted">Ciudad</span>
            <input list="ops-cities" value={city} onChange={e=>setCity(e.target.value)} placeholder="Guayaquil" />
            <datalist id="ops-cities">
              {cities.map(c => <option key={c.key} value={c.name} />)}
            </datalist>
          </label>
          <button className="btn secondary" onClick={() => centerOnCityFromList(setCenter, city, cities, setBounds)}>Centrar ciudad</button>
          <FiltersTrip value={tripStates} onChange={setTripStates} />
          <FiltersDriver value={driverStates} onChange={setDriverStates} />
          <button className="btn secondary" onClick={() => setAutoRefresh(a => !a)}>{autoRefresh ? 'Pausar' : 'Reanudar'} auto</button>
          <button className="btn secondary" onClick={() => setUseSse(s => !s)}>{useSse ? 'Usar polling' : 'Usar SSE'}</button>
          <label className="row" style={{gap:8}}>
            <input type="checkbox" checked={follow} onChange={e=>setFollow(e.target.checked)} />
            <span className="muted">Seguir seleccionado</span>
          </label>
          <a className="btn secondary" href="/admin/ops/cities">Administrar ciudades</a>
        </div>
      </div>
      <div className="card" style={{padding:0, marginTop:10, display:'flex', gap:12}}>
        <div style={{flex:'1 1 auto'}}>
          <OpsMap trips={tripPoints} drivers={driverPoints} onSelect={(sel) => setSelected(sel)} selected={selected} follow={follow} center={center} bounds={bounds} />
        </div>
        <SidePanel selected={selected} trips={trips} drivers={drivers} onClose={() => { setSelected(null); setSelectedTripDetail(null) }} onNeedTripDetail={async (id) => {
          const token = getValidToken(); if (!token) return
          const d = await apiFetch(`/trips/${encodeURIComponent(id)}`, {}, token)
          setSelectedTripDetail(d)
        }} />
      </div>
      <div className="row" style={{gap:16, marginTop:10, flexWrap:'wrap'}}>
        <div className="card" style={{flex:'1 1 300px'}}>
          <strong>Activos</strong>
          <div className="muted">Trips activos: {activeTrips.length}</div>
          <div className="muted">Drivers activos: {drivers.length}</div>
          <div className="row" style={{gap:10, marginTop:8, flexWrap:'wrap'}}>
            <Legend color="#22c55e" label="Origen" />
            <Legend color="#ef4444" label="Destino" />
            <Legend color="#4f46e5" label="Driver ON_TRIP" dot />
            <Legend color="#9aa4b2" label="Driver IDLE" dot />
          </div>
        </div>
        <div className="card" style={{flex:'2 1 480px'}}>
          <strong>Últimos trips activos</strong>
          <table className="table">
            <thead><tr><th>ID</th><th>Status</th><th>Ciudad</th><th>Driver</th></tr></thead>
            <tbody>
              {activeTrips.slice(0,10).map(t => (
                <tr key={t.id}><td>{t.id}</td><td>{t.status}</td><td className="muted">{t.city || '-'}</td><td className="muted">{t.driverId || '-'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function getOrigin(trip: any): { lat: number, lng: number } | null {
  if (trip?.origin && typeof trip.origin.lat === 'number' && typeof trip.origin.lng === 'number') return { lat: trip.origin.lat, lng: trip.origin.lng }
  if (trip?.pickupLat != null && trip?.pickupLng != null) return { lat: Number(trip.pickupLat), lng: Number(trip.pickupLng) }
  return null
}

function getDestination(trip: any): { lat: number, lng: number } | null {
  if (trip?.destination && typeof trip.destination.lat === 'number' && typeof trip.destination.lng === 'number') return { lat: trip.destination.lat, lng: trip.destination.lng }
  if (trip?.dropoffLat != null && trip?.dropoffLng != null) return { lat: Number(trip.dropoffLat), lng: Number(trip.dropoffLng) }
  return null
}

function Legend({ color, label, dot }: { color: string, label: string, dot?: boolean }) {
  return (
    <div className="row" style={{gap:6, alignItems:'center'}}>
      <span style={{width: dot ? 12 : 16, height: dot ? 12 : 10, background: color, borderRadius: dot ? '50%' : 2, display:'inline-block'}}></span>
      <span className="muted">{label}</span>
    </div>
  )
}

function SidePanel({ selected, trips, drivers, onClose, onNeedTripDetail }: { selected: { type: 'trip'|'driver', id: string } | null, trips: Trip[], drivers: DriverSnap[], onClose: () => void, onNeedTripDetail: (id: string) => void }) {
  if (!selected) return <div style={{width:320}}></div>
  const style: any = { width: 320, borderLeft: '1px solid rgba(255,255,255,0.1)', padding: 12 }
  if (selected.type === 'trip') {
    const t = trips.find(x => x.id === selected.id)
    return (
      <div style={style}>
        <div className="row" style={{justifyContent:'space-between'}}>
          <strong>Trip</strong>
          <button className="btn secondary" onClick={onClose}>Cerrar</button>
        </div>
        <div className="muted" style={{marginTop:6}}>{t?.id}</div>
        <div className="muted">Status: {t?.status || '-'}</div>
        <div className="muted">Ciudad: {t?.city || '-'}</div>
        <div className="muted">Driver: {t?.driverId || '-'}</div>
        <div style={{marginTop:8}}>
          <a className="btn" href={`/admin/trips/${selected.id}`}>Abrir detalle</a>
          <button className="btn secondary" style={{marginLeft:8}} onClick={() => onNeedTripDetail(selected.id)}>Refrescar</button>
        </div>
      </div>
    )
  } else {
    const d = drivers.find(x => x.id === selected.id)
    return (
      <div style={style}>
        <div className="row" style={{justifyContent:'space-between'}}>
          <strong>Driver</strong>
          <button className="btn secondary" onClick={onClose}>Cerrar</button>
        </div>
        <div className="muted" style={{marginTop:6}}>{d?.id}</div>
        <div className="muted">Status: {d?.status || '-'}</div>
        <div className="muted">Ubicación: {d?.lat ?? '-'}, {d?.lng ?? '-'}</div>
        <div className="muted">Actualizado: {d?.at ? new Date(d.at).toLocaleString() : '-'}</div>
      </div>
    )
  }
}

function FiltersTrip({ value, onChange }: { value: string[], onChange: (v: string[]) => void }) {
  const options = ['REQUESTED','ASSIGNED','ACCEPTED','ARRIVED','STARTED']
  const toggle = (s: string) => onChange(value.includes(s) ? value.filter(v => v !== s) : value.concat(s))
  return (
    <div className="row" style={{gap:6}}>
      <span className="muted">Trip</span>
      {options.map(s => (
        <label key={s} className="row" style={{gap:4}}>
          <input type="checkbox" checked={value.includes(s)} onChange={() => toggle(s)} />
          <span className="muted" style={{fontSize:12}}>{s}</span>
        </label>
      ))}
    </div>
  )
}

function FiltersDriver({ value, onChange }: { value: string[], onChange: (v: string[]) => void }) {
  const options = ['IDLE','ON_TRIP','ASSIGNED','ARRIVED']
  const toggle = (s: string) => onChange(value.includes(s) ? value.filter(v => v !== s) : value.concat(s))
  return (
    <div className="row" style={{gap:6}}>
      <span className="muted">Driver</span>
      {options.map(s => (
        <label key={s} className="row" style={{gap:4}}>
          <input type="checkbox" checked={value.includes(s)} onChange={() => toggle(s)} />
          <span className="muted" style={{fontSize:12}}>{s}</span>
        </label>
      ))}
    </div>
  )
}

function centerOnCityFromList(setCenter: (v: { lat: number, lng: number, zoom?: number } | null) => void, city: string, cities: Array<{ key: string, name: string, center: { lat: number, lng: number }, zoom?: number, bounds?: { sw: { lat: number, lng: number }, ne: { lat: number, lng: number } } }>, setBounds?: (v: any) => void) {
  if (!city) return
  const key = city.trim().toLowerCase()
  const found = cities.find(c => c.key.toLowerCase() === key || c.name.toLowerCase() === key)
  if (found) {
    if (found.bounds && setBounds) { setBounds(found.bounds); setCenter(null) }
    else { if (setBounds) setBounds(null); setCenter({ ...found.center, zoom: found.zoom }) }
  }
}


