'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import LiveMap from '@/src/components/LiveMap'
import { apiFetch } from '@/src/lib/api'
import { getUser, getValidToken } from '@/src/lib/auth'
import { useToast } from '@/src/components/Toast'
import { SkeletonBlock, SkeletonCard, SkeletonLines } from '@/src/components/Skeleton'

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
  const [autoShare, setAutoShare] = useState<boolean>(true)
  const [active, setActive] = useState<ActiveTrip | null>(null)
  const [assigned, setAssigned] = useState<ActiveTrip[]>([])
  const [selectedAssignedId, setSelectedAssignedId] = useState<string | null>(null)
  const selectedAssigned = useMemo(() => assigned.find(a => a.id === selectedAssignedId) || null, [assigned, selectedAssignedId])
  const [startMethod, setStartMethod] = useState<'CASH'|'CARD'>('CASH')
  const [cancelInfo, setCancelInfo] = useState<{ feeUsd: number, graceRemainingSec: number|null } | null>(null)
  const cancelTimer = useRef<any>(null)
  const prevGrace = useRef<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [driverLoc, setDriverLoc] = useState<{ lat: number, lng: number } | null>(null)
  const geoWatchId = useRef<number | null>(null)
  const pollTimer = useRef<any>(null)
  const prevAssigned = useRef<Set<string>>(new Set())
  const audioRef = useRef<any>(null)
  const [flashUntil, setFlashUntil] = useState<number>(0)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [flashEnabled, setFlashEnabled] = useState<boolean>(true)

  useEffect(() => {
    const u = getUser()
    if (!u) { location.replace('/login'); return }
    if (u.role !== 'DRIVER') { setError('Acceso solo para DRIVER'); setLoading(false); return }
    // Load driver UI preferences
    try {
      const raw = localStorage.getItem('driver_prefs')
      if (raw) {
        const p = JSON.parse(raw)
        if (typeof p.beep === 'boolean') setSoundEnabled(p.beep)
        if (typeof p.flash === 'boolean') setFlashEnabled(p.flash)
        if (typeof p.autoShare === 'boolean') setAutoShare(p.autoShare)
        if (p.paymentMethod === 'CASH' || p.paymentMethod === 'CARD') setStartMethod(p.paymentMethod)
      }
    } catch {}
    refreshActive()
    pollTimer.current = setInterval(refreshActive, 4000)
    return () => { if (pollTimer.current) clearInterval(pollTimer.current) }
  }, [])

  // Persist prefs
  useEffect(() => {
    try {
      const raw = localStorage.getItem('driver_prefs')
      const prev = raw ? JSON.parse(raw) : {}
      localStorage.setItem('driver_prefs', JSON.stringify({
        beep: soundEnabled,
        flash: flashEnabled,
        autoShare,
        paymentMethod: startMethod
      }))
    } catch {}
  }, [soundEnabled, flashEnabled, autoShare, startMethod])

  async function refreshActive() {
    setLoading(true)
    try {
      const token = getValidToken(); if (!token) { location.replace('/login'); return }
      const resp = await apiFetch<{ items: ActiveTrip[] }>(`/drivers/my-trips/active`, {}, token)
      const items = Array.isArray(resp.items) ? resp.items : []
      const assignedItems = items.filter(it => it.status === 'ASSIGNED')
      const current = items.find(it => it.status !== 'ASSIGNED') || null
      // Detectar nuevos asignados para alertar
      const currentIds = new Set(assignedItems.map(x => x.id))
      let hasNew = false
      for (const id of currentIds) if (!prevAssigned.current.has(id)) { hasNew = true; break }
      prevAssigned.current = currentIds

      setAssigned(assignedItems)
      setActive(current)
      // Prefer rider preferredMethod if present; else keep driver prefs
      if (current?.preferredMethod) setStartMethod((current.preferredMethod as any) || startMethod)
      // Si hay viaje activo y autoShare habilitado, asegurar geolocalización encendida
      if (current && autoShare && !sharing) {
        try { startSharing() } catch {}
      }
      if (hasNew) {
        playBeep()
        if (flashEnabled) { const until = Date.now()+1200; setFlashUntil(until); setTimeout(()=>{ setFlashUntil(0) }, 1250) }
      }
      if (current) { try { fetchCancelQuote(current.id) } catch {} }
    } catch (e: any) { setError(e?.message || 'Error'); } finally { setLoading(false) }
  }

  // Notify when rider grace window ends
  useEffect(() => {
    const cur = cancelInfo?.graceRemainingSec ?? null
    const prev = prevGrace.current
    if (prev != null && prev > 0 && cur === 0) {
      show('Ventana de gracia agotada: puede aplicar fee si cancelan', 'info')
    }
    prevGrace.current = cur
  }, [cancelInfo?.graceRemainingSec])

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

  function captureOnce() {
    if (!navigator.geolocation) { show('Geolocalización no disponible', 'error'); return }
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords
      setDriverLoc({ lat: latitude, lng: longitude })
      show('Ubicación capturada', 'success')
    }, () => show('No se pudo capturar ubicación', 'error'), { enableHighAccuracy: true, maximumAge: 1000, timeout: 8000 })
  }

  async function reportLocation(lat: number, lng: number) {
    try {
      const token = getValidToken(); if (!token) return
      const status = active ? 'ON_TRIP' : (online ? 'IDLE' : 'OFFLINE')
      await apiFetch(`/drivers/location`, { method: 'POST', body: JSON.stringify({ lat, lng, status }) }, token)
    } catch {}
  }

  function playBeep() {
    try {
      if (!soundEnabled) return
      const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext
      if (!Ctx) return
      if (!audioRef.current) audioRef.current = new Ctx()
      const ctx = audioRef.current as AudioContext
      const o = ctx.createOscillator(); const g = ctx.createGain()
      o.type = 'sine'; o.frequency.value = 880
      g.gain.value = 0.05
      o.connect(g); g.connect(ctx.destination)
      o.start(); setTimeout(() => { try { o.stop(); o.disconnect(); g.disconnect() } catch {} }, 220)
    } catch {}
  }
  // Keyboard shortcuts: r refresh, s toggle share
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea') return
      if (e.key === 'r' || e.key === 'R') { e.preventDefault(); refreshActive() }
      if (e.key === 's' || e.key === 'S') { e.preventDefault(); sharing ? stopSharing() : startSharing() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sharing])

  async function fetchCancelQuote(tripId: string) {
    try {
      const data = await fetchCancelQuoteForTrip(tripId)
      setCancelInfo(data)
      if (cancelTimer.current) { clearInterval(cancelTimer.current); cancelTimer.current = null }
      if (typeof data.graceRemainingSec === 'number' && data.graceRemainingSec > 0) {
        cancelTimer.current = setInterval(() => {
          setCancelInfo(prev => prev ? { ...prev, graceRemainingSec: Math.max(0, (prev.graceRemainingSec || 0) - 1) } : prev)
        }, 1000)
      }
    } catch {}
  }

  async function action(id: string, kind: 'accept'|'arrived'|'start'|'complete'|'reject') {
    try {
      const token = getValidToken(); if (!token) return
      if (kind === 'start') {
        await apiFetch(`/trips/${encodeURIComponent(id)}/start`, { method: 'POST', body: JSON.stringify({ method: startMethod || active?.preferredMethod || 'CASH' }) }, token)
      } else if (kind === 'reject') {
        await apiFetch(`/trips/${encodeURIComponent(id)}/reject`, { method: 'POST' }, token)
      } else {
        await apiFetch(`/trips/${encodeURIComponent(id)}/${kind}`, { method: 'POST' }, token)
      }
      show(`Acción: ${kind}`, 'success')
      if (kind === 'accept' && autoShare && !sharing) {
        // Al aceptar, empezar a compartir ubicación si está habilitado
        try { startSharing() } catch {}
      }
      try { fetchCancelQuote(id) } catch {}
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
  }, [driverLoc, origin, dest])

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
          <label className="row" style={{gap:6, alignItems:'center', marginLeft:8}}>
            <input type="checkbox" checked={autoShare} onChange={e=>setAutoShare(e.target.checked)} />
            <span>Auto compartir al aceptar</span>
          </label>
          <label className="row" style={{gap:6, alignItems:'center'}}>
            <input type="checkbox" checked={soundEnabled} onChange={e=>setSoundEnabled(e.target.checked)} />
            <span>Beep nuevos asignados</span>
          </label>
          <label className="row" style={{gap:6, alignItems:'center'}}>
            <input type="checkbox" checked={flashEnabled} onChange={e=>setFlashEnabled(e.target.checked)} />
            <span>Flash destacados</span>
          </label>
          {!sharing && (
            <button className="btn secondary" onClick={captureOnce}>Usar mi ubicación</button>
          )}
        </div>
      </div>

      {loading && (
        <div className="card" style={{marginBottom:12}}>
          <strong>Asignados</strong>
          <div style={{marginTop:8}}>
            <SkeletonBlock height={14} width={220} style={{marginBottom:8}} />
            <SkeletonBlock height={10} style={{marginBottom:6}} />
            <SkeletonBlock height={10} style={{marginBottom:6}} />
            <SkeletonBlock height={10} style={{marginBottom:6}} />
          </div>
        </div>
      )}

      {assigned.length > 0 && !loading && (
        <div className="card" style={{marginBottom:12, boxShadow: (flashUntil && flashUntil > Date.now()) ? '0 0 0 3px rgba(34,197,94,0.35) inset' : undefined}}>
          <strong>Asignados</strong>
          <div className="table-wrap" style={{marginTop:8}}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Recogida</th>
                  <th>Destino</th>
                  <th>Distancia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {assignedSorted(driverLoc, assigned).map(({ it, distKm }) => (
                  <tr key={it.id}>
                    <td>{it.id}</td>
                    <td>{it.pickupLat.toFixed(5)}, {it.pickupLng.toFixed(5)}</td>
                    <td>{it.dropoffLat.toFixed(5)}, {it.dropoffLng.toFixed(5)}</td>
                    <td>{distKm != null ? `${distKm.toFixed(2)} km` : '-'}</td>
                    <td>
                      <button className="btn secondary" onClick={() => setSelectedAssignedId(it.id)} style={{marginRight:6}}>Ver</button>
                      <button className="btn" disabled={!online} onClick={() => action(it.id, 'accept')} style={{marginRight:6}}>Aceptar</button>
                      <button className="btn danger" onClick={() => action(it.id, 'reject')}>Rechazar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {driverLoc && <div className="muted" style={{marginTop:6}}>Ordenado por cercanía a tu ubicación</div>}
          <div className="card" style={{marginTop:10}}>
            <strong>Vista previa</strong>
            {selectedAssigned ? (
              <div style={{marginTop:8}}>
                <LiveMap
                  origin={{ lat: Number(selectedAssigned.pickupLat), lng: Number(selectedAssigned.pickupLng) }}
                  destination={{ lat: Number(selectedAssigned.dropoffLat), lng: Number(selectedAssigned.dropoffLng) }}
                  height={220}
                />
                <AssignedEtas selected={selectedAssigned} driverLoc={driverLoc} />
                <div className="row" style={{marginTop:8, gap:8}}>
                  <button className="btn secondary" onClick={() => setSelectedAssignedId(null)}>Cerrar</button>
                  <button className="btn" disabled={!online} onClick={() => action(selectedAssigned.id, 'accept')}>Aceptar</button>
                  <button className="btn danger" onClick={() => action(selectedAssigned.id, 'reject')}>Rechazar</button>
                </div>
              </div>
            ) : (
              <div className="muted" style={{marginTop:8}}>Selecciona un asignado para previsualizar</div>
            )}
          </div>
        </div>
      )}

      <div className="card">
        <strong>Viaje activo</strong>
        {loading ? (
          <div style={{marginTop:8}}>
            <SkeletonLines lines={2} />
            <div style={{marginTop:10}}>
              <SkeletonBlock height={300} />
            </div>
            <div className="row" style={{gap:8, marginTop:10}}>
              <SkeletonBlock height={32} width={120} />
              <SkeletonBlock height={32} width={120} />
              <SkeletonBlock height={32} width={120} />
            </div>
          </div>
        ) : !active ? (
          <div className="muted" style={{marginTop:8}}>Sin viaje activo asignado.</div>
        ) : (
          <div style={{marginTop:8}}>
            <div className="muted">ID: {active.id} • Estado: {active.status} {active.preferredMethod ? `• Pago: ${active.preferredMethod}` : ''}</div>
            {cancelInfo && (
              <div className="row" style={{gap:8, alignItems:'center', marginTop:6}}>
                {typeof cancelInfo.graceRemainingSec === 'number' && cancelInfo.graceRemainingSec > 0 ? (
                  <div className="card" style={{padding:'4px 8px'}}>Gracia rider: {fmtSec(cancelInfo.graceRemainingSec)}</div>
                ) : (
                  <div className="muted">{cancelInfo.feeUsd > 0 ? `Fee cancelación: $${cancelInfo.feeUsd.toFixed(2)}` : 'Sin fee por cancelación'}</div>
                )}
              </div>
            )}
            <div className="muted" style={{marginTop:4}}>
              {kmToPickup != null && <span>Hacia recogida: {kmToPickup.toFixed(2)} km • ~{etaToPickupMin} min. </span>}
              {legKm != null && <span>Trayecto: {legKm.toFixed(2)} km • ~{legEtaMin} min.</span>}
            </div>
            <div style={{marginTop:10}}>
              <LiveMap origin={origin} destination={dest} driver={driverLoc || undefined} height={300} controls={true} />
            </div>
            <div className="row" style={{gap:8, flexWrap:'wrap', marginTop:10}}>
              <label className="row" style={{gap:6, alignItems:'center'}}>
                <span>Método</span>
                <select value={startMethod} onChange={e=>setStartMethod(e.target.value as any)}>
                  <option value="CASH">CASH</option>
                  <option value="CARD">CARD</option>
                </select>
              </label>
              <a className="btn secondary" href={googleMapsNav(origin)} target="_blank" rel="noopener noreferrer">Google Maps (recogida)</a>
              <a className="btn secondary" href={googleMapsNav(dest)} target="_blank" rel="noopener noreferrer">Google Maps (destino)</a>
              <a className="btn secondary" href={appleMapsNav(origin)} target="_blank" rel="noopener noreferrer">Apple Maps (recogida)</a>
              <a className="btn secondary" href={appleMapsNav(dest)} target="_blank" rel="noopener noreferrer">Apple Maps (destino)</a>
              <button className="btn" disabled={active.status !== 'ASSIGNED' || !online} onClick={() => action(active.id, 'accept')}>Aceptar</button>
              <button className="btn" disabled={active.status !== 'ACCEPTED'} onClick={() => action(active.id, 'arrived')}>Llegué</button>
              <button className="btn" disabled={!(active.status === 'ACCEPTED' || active.status === 'ARRIVED')} onClick={() => action(active.id, 'start')}>Iniciar</button>
              <button className="btn" disabled={active.status !== 'STARTED'} onClick={() => action(active.id, 'complete')}>Completar</button>
              {active.status === 'ASSIGNED' && (
                <button className="btn danger" onClick={() => action(active.id, 'reject')}>Rechazar</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function assignedSorted(driverLoc: { lat: number, lng: number } | null, list: ActiveTrip[]) {
  const deg2rad = (d: number) => d * Math.PI / 180
  const toKm = (a?: {lat:number,lng:number}|null, b?: {lat:number,lng:number}|null) => {
    if (!a || !b) return null
    const R = 6371; const dLat = deg2rad(b.lat - a.lat); const dLon = deg2rad(b.lng - a.lng)
    const aa = Math.sin(dLat/2)**2 + Math.cos(deg2rad(a.lat))*Math.cos(deg2rad(b.lat))*Math.sin(dLon/2)**2
    const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa))
    return R * c
  }
  const rows = list.map(it => {
    const distKm = driverLoc ? toKm(driverLoc, { lat: Number(it.pickupLat), lng: Number(it.pickupLng) }) : null
    return { it, distKm: distKm == null ? null : Number(distKm) }
  })
  if (!driverLoc) return rows
  return rows.sort((a,b) => (a.distKm ?? Infinity) - (b.distKm ?? Infinity))
}

function googleMapsNav(pos: { lat: number, lng: number } | null) {
  if (!pos) return '#'
  const dest = `${encodeURIComponent(pos.lat)},${encodeURIComponent(pos.lng)}`
  return `https://www.google.com/maps/dir/?api=1&destination=${dest}`
}

function appleMapsNav(pos: { lat: number, lng: number } | null) {
  if (!pos) return '#'
  const dest = `${encodeURIComponent(pos.lat)},${encodeURIComponent(pos.lng)}`
  return `http://maps.apple.com/?daddr=${dest}`
}

function fmtSec(s: number) {
  const m = Math.floor(s/60); const r = s % 60
  return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`
}

async function fetchCancelQuoteForTrip(id: string): Promise<{ feeUsd: number, graceRemainingSec: number|null }> {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
  const token = getValidToken(); if (!token) return { feeUsd: 0, graceRemainingSec: null }
  const res = await fetch(`${base}/trips/${encodeURIComponent(id)}/cancel/quote`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
  if (!res.ok) return { feeUsd: 0, graceRemainingSec: null }
  const q = await res.json()
  return { feeUsd: Number(q.feeUsd||0), graceRemainingSec: typeof q.graceRemainingSec==='number'?q.graceRemainingSec:null }
}

function AssignedEtas({ selected, driverLoc }: { selected: ActiveTrip, driverLoc: { lat: number, lng: number } | null }) {
  const speedKmh = 28
  const deg2rad = (d: number) => d * Math.PI / 180
  const toKm = (a?: {lat:number,lng:number}|null, b?: {lat:number,lng:number}|null) => {
    if (!a || !b) return null
    const R = 6371; const dLat = deg2rad(b.lat - a.lat); const dLon = deg2rad(b.lng - a.lng)
    const aa = Math.sin(dLat/2)**2 + Math.cos(deg2rad(a.lat))*Math.cos(deg2rad(b.lat))*Math.sin(dLon/2)**2
    const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa))
    return R * c
  }
  const pickup = { lat: Number(selected.pickupLat), lng: Number(selected.pickupLng) }
  const drop = { lat: Number(selected.dropoffLat), lng: Number(selected.dropoffLng) }
  const k1 = driverLoc ? toKm(driverLoc, pickup) : null
  const k2 = toKm(pickup, drop)
  const e1 = k1==null?null:Math.round((k1/speedKmh)*60)
  const e2 = k2==null?null:Math.round((k2/speedKmh)*60)
  return (
    <div className="muted" style={{marginTop:6}}>
      {k1!=null && <span>Hacia recogida: {k1.toFixed(2)} km • ~{e1} min. </span>}
      {k2!=null && <span>Trayecto: {k2.toFixed(2)} km • ~{e2} min.</span>}
    </div>
  )
}
