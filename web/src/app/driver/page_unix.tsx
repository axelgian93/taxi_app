'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import LiveMap from '@/src/components/LiveMap'
import { apiFetch } from '@/src/lib/api'
import { getUser, getValidToken } from '@/src/lib/auth'
import { useToast } from '@/src/components/Toast'

type ActiveTrip = {
  id: string
  status: 'ASSIGNED'|'ACCEPTED'|'ARRIVED'|'STARTED'
  pickupLat: number
  pickupLng: number
  dropoffLat: number
  dropoffLng: number
  requestedAt: string
  preferredMethod?: 'CASH'|'CARD'|null
}

export default function DriverHome() {
  const { show } = useToast()
  const [online, setOnline] = useState<boolean>(true)
  const [sharing, setSharing] = useState<boolean>(false)
  const [active, setActive] = useState<ActiveTrip | null>(null)
  const [assigned, setAssigned] = useState<ActiveTrip[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [driverLoc, setDriverLoc] = useState<{ lat: number, lng: number } | null>(null)
  const geoWatchId = useRef<number | null>(null)
  const pollTimer = useRef<any>(null)

  useEffect(() => {
    const u = getUser()
    if (!u) { location.replace('/login'); return }
    if (u.role !== 'DRIVER') { setError('Acceso solo para DRIVER'); setLoading(false); return }
    refreshActive()
    pollTimer.current = setInterval(refreshActive, 4000)
    return () => { if (pollTimer.current) clearInterval(pollTimer.current) }
  }, [])

  async function refreshActive() {
    setLoading(true)
    try {
      const token = getValidToken(); if (!token) { location.replace('/login'); return }
      const resp = await apiFetch<{ items: ActiveTrip[] }>(`/drivers/my-trips/active`, {}, token)
      const items = Array.isArray(resp.items) ? resp.items : []
      const assignedItems = items.filter(it => it.status === 'ASSIGNED')
      const current = items.find(it => it.status !== 'ASSIGNED') || null
      setAssigned(assignedItems)
      setActive(current)
    } catch (e: any) { setError(e?.message || 'Error'); } finally { setLoading(false) }
  }

  async function setDriverStatus(next: 'IDLE'|'OFFLINE') {
    try {
      const token = getValidToken(); if (!token) return
      await apiFetch(`/drivers/status`, { method: 'POST', body: JSON.stringify({ status: next }) }, token)
      setOnline(next !== 'OFFLINE')
      show(next === 'OFFLINE' ? 'Pasaste a OFFLINE' : 'Estás ONLINE', 'success')
    } catch (e: any) { show(e?.message || 'Error al actualizar estado', 'error') }
  }

  function startSharing() {
    if (!navigator.geolocation) { show('Geolocalización no disponible', 'error'); return }
    if (geoWatchId.current != null) return
    geoWatchId.current = navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords
      setDriverLoc({ lat: latitude, lng: longitude })
      reportLocation(latitude, longitude).catch(()=>{})
    }, (err) => { show(err?.message || 'No se pudo leer ubicación', 'error') }, { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }) as any
    setSharing(true)
    show('Compartiendo ubicación…', 'info')
  }

  function stopSharing() {
    if (geoWatchId.current != null) { try { navigator.geolocation.clearWatch(geoWatchId.current) } catch {} geoWatchId.current = null }
    setSharing(false)
    show('Ubicación detenida', 'info')
  }

  async function reportLocation(lat: number, lng: number) {
    try {
      const token = getValidToken(); if (!token) return
      const status = active ? 'ON_TRIP' : (online ? 'IDLE' : 'OFFLINE')
      await apiFetch(`/drivers/location`, { method: 'POST', body: JSON.stringify({ lat, lng, status }) }, token)
    } catch {}
  }

  async function action(id: string, kind: 'accept'|'arrived'|'start'|'complete') {
    try {
      const token = getValidToken(); if (!token) return
      if (kind === 'start') {
        // default to CASH if no preference; backend accepts body { method }
        await apiFetch(`/trips/${encodeURIComponent(id)}/start`, { method: 'POST', body: JSON.stringify({ method: active?.preferredMethod || 'CASH' }) }, token)
      } else {
        await apiFetch(`/trips/${encodeURIComponent(id)}/${kind}`, { method: 'POST' }, token)
      }
      show(`Acción: ${kind}`, 'success')
      await refreshActive()
    } catch (e: any) { show(e?.message || 'Error realizando acción', 'error') }
  }

  const origin = useMemo(() => active ? { lat: Number(active.pickupLat), lng: Number(active.pickupLng) } : null, [active?.id])
  const dest = useMemo(() => active ? { lat: Number(active.dropoffLat), lng: Number(active.dropoffLng) } : null, [active?.id])
  const [kmToPickup, etaToPickupMin, legKm, legEtaMin] = useMemo(() => {
    const speedKmh = 28
    const toKm = (a?: {lat:number,lng:number}|null, b?: {lat:number,lng:number}|null) => {
      if (!a || !b) return null
      const R = 6371; const dLat = deg2rad(b.lat - a.lat); const dLon = deg2rad(b.lng - a.lng)
      const aa = Math.sin(dLat/2)**2 + Math.cos(deg2rad(a.lat))*Math.cos(deg2rad(b.lat))*Math.sin(dLon/2)**2
      const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa))
      return R * c
    }
    const deg2rad = (d:number)=>d*Math.PI/180
    const k1 = (driverLoc && origin) ? toKm(driverLoc, origin) : null
    const k2 = (origin && dest) ? toKm(origin, dest) : null
    const e1 = k1==null?null:Math.round((k1/speedKmh)*60)
    const e2 = k2==null?null:Math.round((k2/speedKmh)*60)
    return [k1, e1, k2, e2] as const
  }, [JSON.stringify(driverLoc), JSON.stringify(origin), JSON.stringify(dest)])

  return (
    <div>
      <h2>Panel del Conductor</h2>
      {error && <div style={{color:'var(--danger)', marginBottom:8}}>{error}</div>}
      <div className="card" style={{marginBottom:12}}>
        <div className="row" style={{gap:10, flexWrap:'wrap', alignItems:'center'}}>
          <label className="row" style={{gap:6, alignItems:'center'}}>
            <input type="checkbox" checked={online} onChange={e => setDriverStatus(e.target.checked ? 'IDLE' : 'OFFLINE')} />
            <span>{online ? 'Online' : 'Offline'}</span>
          </label>
          <label className="row" style={{gap:6, alignItems:'center'}}>
            <input type="checkbox" checked={sharing} onChange={e => e.target.checked ? startSharing() : stopSharing()} />
            <span>Compartir ubicación</span>
          </label>
          <a className="btn secondary" href="/driver/history">Historial</a>
          <button className="btn secondary" onClick={refreshActive} disabled={loading}>Refrescar</button>
        </div>
      </div>

      {assigned.length > 0 && (
        <div className="card" style={{marginBottom:12}}>
          <strong>Asignados</strong>
          <div className="table-wrap" style={{marginTop:8}}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Recogida</th>
                  <th>Destino</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {assigned.map(it => (
                  <tr key={it.id}>
                    <td>{it.id}</td>
                    <td>{it.pickupLat.toFixed(5)}, {it.pickupLng.toFixed(5)}</td>
                    <td>{it.dropoffLat.toFixed(5)}, {it.dropoffLng.toFixed(5)}</td>
                    <td>
                      <button className="btn" onClick={() => action(it.id, 'accept')}>Aceptar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card">
        <strong>Viaje activo</strong>
        {loading ? (
          <div className="muted" style={{marginTop:8}}>Cargando…</div>
        ) : !active ? (
          <div className="muted" style={{marginTop:8}}>Sin viaje activo asignado.</div>
        ) : (
          <div style={{marginTop:8}}>
            <div className="muted">ID: {active.id} • Estado: {active.status} {active.preferredMethod ? `• Pago: ${active.preferredMethod}` : ''}</div>
            <div className="muted" style={{marginTop:4}}>
              {kmToPickup != null && <span>Hacia recogida: {kmToPickup.toFixed(2)} km • ~{etaToPickupMin} min. </span>}
              {legKm != null && <span>Trayecto: {legKm.toFixed(2)} km • ~{legEtaMin} min.</span>}
            </div>
            <div style={{marginTop:10}}>
              <LiveMap origin={origin} destination={dest} driver={driverLoc || undefined} height={300} />
            </div>
            <div className="row" style={{gap:8, flexWrap:'wrap', marginTop:10}}>
              <button className="btn" disabled={active.status !== 'ASSIGNED'} onClick={() => action(active.id, 'accept')}>Aceptar</button>
              <button className="btn" disabled={active.status !== 'ACCEPTED'} onClick={() => action(active.id, 'arrived')}>Llegué</button>
              <button className="btn" disabled={!(active.status === 'ACCEPTED' || active.status === 'ARRIVED')} onClick={() => action(active.id, 'start')}>Iniciar</button>
              <button className="btn" disabled={active.status !== 'STARTED'} onClick={() => action(active.id, 'complete')}>Completar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
