'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { apiFetch } from '@/src/lib/api'
import { getValidToken, getUser } from '@/src/lib/auth'
import Link from 'next/link'
import { connectSSE, type SseEvent } from '@/src/lib/sse'
import LiveMap from '@/src/components/LiveMap'
import { SkeletonBlock, SkeletonLines } from '@/src/components/Skeleton'

type TripDetail = {
  id: string
  status: string
  riderId?: string | null
  driverId?: string | null
  city?: string | null
  requestedAt?: string | null
  startedAt?: string | null
  completedAt?: string | null
  origin?: any
  destination?: any
  pricing?: any
}

type TripResp = { ok: boolean, trip: TripDetail, pricing?: any }

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [trip, setTrip] = useState<TripDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [useSse, setUseSse] = useState(true)
  const [events, setEvents] = useState<SseEvent[]>([])
  const abortRef = useRef<AbortController | null>(null)
  const [loc, setLoc] = useState<{lat: number|null, lng: number|null, at: string|null}|null>(null)

  async function fetchDriverLocation() {
    const token = getValidToken()
    if (!token) { location.href = '/login'; return }
    try {
      const res = await apiFetch<{ tripId: string, driverId: string|null, lat: number|null, lng: number|null, locationUpdatedAt: string|null }>(`/trips/${encodeURIComponent(id)}/driver-location`, {}, token)
      setLoc({ lat: res.lat, lng: res.lng, at: res.locationUpdatedAt })
    } catch (e: any) {
      alert(e?.message || 'No se pudo obtener ubicación')
    }
  }

  useEffect(() => {
    const user = getUser()
    if (!user) { location.replace('/login'); return }
    if (user.role !== 'ADMIN') { setError('Acceso solo para ADMIN'); setLoading(false); return }
    const token = getValidToken()
    if (!token) { location.replace('/login'); return }
    apiFetch<TripResp>(`/trips/${encodeURIComponent(id)}`, {}, token)
      .then(resp => setTrip(resp.trip))
      .catch(err => setError(err?.message || 'Error al cargar el trip'))
      .finally(() => setLoading(false))
  }, [id])

  // Prefer SSE for real-time; fallback to polling
  useEffect(() => {
    if (!autoRefresh) return
    const token = getValidToken()
    if (!token) return
    if (useSse) {
      const controller = new AbortController()
      abortRef.current = controller
      connectSSE(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'}/trips/${encodeURIComponent(id)}/sse`, {
        token,
        signal: controller.signal,
        onEvent: (ev) => {
          setEvents(prev => [ev, ...prev].slice(0, 50))
          if (ev?.data?.status) {
            setTrip(prev => ({ ...(prev || {} as any), status: ev.data.status }))
          }
          const type = (ev?.event || ev?.data?.type || '').toUpperCase()
          if (type === 'LOCATION' && ev?.data?.lat != null && ev?.data?.lng != null) {
            setLoc({ lat: Number(ev.data.lat), lng: Number(ev.data.lng), at: ev?.data?.at || new Date().toISOString() })
          }
        }
      }).catch(() => {
        // If SSE fails, fallback to polling
        setUseSse(false)
      })
      return () => controller.abort()
    } else {
      let cancelled = false
      const tick = async () => {
        const tk = getValidToken()
        if (!tk) return
        try {
          const resp = await apiFetch<TripResp>(`/trips/${encodeURIComponent(id)}`, {}, tk)
          if (cancelled) return
          setTrip(prev => ({ ...(prev || {} as any), ...(resp.trip || {}) }))
        } catch {}
      }
      const idt = setInterval(tick, 5000)
      tick()
      return () => { cancelled = true; clearInterval(idt) }
    }
  }, [autoRefresh, useSse, id])

  if (loading) return (
    <div className="card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <SkeletonBlock height={24} width={240} />
        <div className="row" style={{gap:8}}>
          <SkeletonBlock height={32} width={120} />
          <SkeletonBlock height={32} width={140} />
        </div>
      </div>
      <div style={{marginTop:10}}>
        <SkeletonLines lines={2} />
      </div>
      <div style={{marginTop:16}}>
        <SkeletonBlock height={360} />
      </div>
      <div className="row" style={{gap:8, marginTop:12}}>
        <SkeletonBlock height={32} width={160} />
        <SkeletonBlock height={32} width={160} />
        <SkeletonBlock height={32} width={160} />
      </div>
    </div>
  )
  if (error) return <div style={{color:'var(--danger)'}}>{error}</div>
  if (!trip) return <div>No encontrado</div>

  return (
    <div className="card">
      <div className="row" style={{justifyContent:'space-between'}}>
        <h2>Trip {trip.id}</h2>
        <div className="row" style={{gap:8}}>
          {trip.status !== 'COMPLETED' && trip.status !== 'CANCELED' && (
            <button className="btn secondary" onClick={onCancelTrip}>Cancelar</button>
          )}
          <button className="btn secondary" onClick={() => setAutoRefresh(a => !a)}>
            {autoRefresh ? 'Pausar' : 'Reanudar'} auto-refresh
          </button>
          <button className="btn secondary" onClick={() => setUseSse(s => !s)}>
            {useSse ? 'Usar polling' : 'Usar SSE'}
          </button>
          <Link className="btn secondary" href="/admin/trips">Volver</Link>
        </div>
      </div>
      <p className="muted">Status: {trip.status}</p>
      <div className="row" style={{gap:24}}>
        <div>
          <strong>Rider</strong>
          <div className="muted">{trip.riderId || '-'}</div>
        </div>
        <div>
          <strong>Driver</strong>
          <div className="muted">{trip.driverId || '-'}</div>
        </div>
        <div>
          <strong>Ciudad</strong>
          <div className="muted">{trip.city || '-'}</div>
        </div>
      </div>
      <div style={{marginTop:16}}>
        <strong>Fechas</strong>
        <div className="muted">requested: {fmt(trip.requestedAt)} · started: {fmt(trip.startedAt)} · completed: {fmt(trip.completedAt)}</div>
      </div>
      <div style={{marginTop:16}}>
        <strong>Coordenadas</strong>
        <pre className="card" style={{overflow:'auto'}}>{JSON.stringify({ origin: trip.origin, destination: trip.destination }, null, 2)}</pre>
      </div>
      <div style={{marginTop:16}}>
        <strong>Mapa</strong>
        <div className="card" style={{padding:0}}>
          <LiveMap
            origin={getOrigin(trip)}
            destination={getDestination(trip)}
            driver={loc && loc.lat != null && loc.lng != null ? { lat: Number(loc.lat), lng: Number(loc.lng) } : undefined}
            height={360}
          />
        </div>
      </div>
      <div style={{marginTop:16}}>
        <strong>Driver (ubicación actual)</strong>
        <div className="row" style={{gap:8}}>
          <button className="btn secondary" onClick={fetchDriverLocation}>Actualizar ubicación</button>
          {loc && <span className="muted">{loc.lat ?? '-'}, {loc.lng ?? '-'} • {loc.at ? new Date(loc.at).toLocaleString() : '-'}</span>}
        </div>
      </div>
      <div style={{marginTop:16}}>
        <strong>Pricing</strong>
        <pre className="card" style={{overflow:'auto'}}>{JSON.stringify((trip as any).pricing || {}, null, 2)}</pre>
      </div>
      <div style={{marginTop:16}}>
        <strong>Eventos</strong>
        {events.length === 0 ? (
          <div className="muted">Sin eventos aún.</div>
        ) : (
          <ul style={{listStyle:'none', padding:0, margin:0}}>
            {events.map((e, i) => (
              <li key={i} className="card" style={{marginTop:8}}>
                <div className="muted">{e.event || 'message'}</div>
                <pre style={{overflow:'auto'}}>{JSON.stringify(e.data, null, 2)}</pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function fmt(iso?: string | null) {
  if (!iso) return '-'
  try { return new Date(iso).toLocaleString() } catch { return iso }
}

async function onCancelTrip() {
  if (!confirm('¿Seguro que deseas cancelar este viaje?')) return
  const custom = prompt('Motivo de cancelación (opcional):', 'ADMIN_PANEL')
  const token = getValidToken()
  if (!token) { location.href = '/login'; return }
  try {
    const reason = 'ADMIN_PANEL'
    await apiFetch(`/trips/${encodeURIComponent((location.pathname.split('/').pop() || ''))}/cancel`, { method: 'POST', body: JSON.stringify({ reason: (custom || reason) }) }, token)
    location.reload()
  } catch (e: any) {
    alert(e?.message || 'No se pudo cancelar')
  }
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

// end
