'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { getValidToken } from '@/src/lib/auth'
import { apiFetch } from '@/src/lib/api'
import LiveMap from '@/src/components/LiveMap'
import { connectSSE } from '@/src/lib/sse'
import { useToast } from '@/src/components/Toast'
import { SkeletonBlock, SkeletonLines } from '@/src/components/Skeleton'

export default function RiderTripDetail() {
  const { show } = useToast()
  const params = useParams() as { id?: string }
  const id = (params?.id as string) || ''
  const [trip, setTrip] = useState<any | null>(null)
  const [driverLoc, setDriverLoc] = useState<{ lat: number|null, lng: number|null } | null>(null)
  const [receipt, setReceipt] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cancelFee, setCancelFee] = useState<{ feeUsd: number, graceRemainingSec: number|null, cancellable: boolean } | null>(null)
  const graceTimer = useRef<any>(null)

  useEffect(() => { (async () => {
    try {
      const token = getValidToken(); if (!token) { location.href = '/rider/login'; return }
      const resp = await apiFetch<{ ok: boolean, trip: any }>(`/trips/${encodeURIComponent(id)}`, {}, token)
      setTrip(resp.trip)
      try { fetchCancelQuote(id, setCancelFee, graceTimer) } catch {}
      connectSSE(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'}/trips/${encodeURIComponent(id)}/sse`, {
        token,
        onEvent: (ev) => {
          if (ev?.data?.status) {
            setTrip((t:any)=>t?{...t,status:ev.data.status}:t)
            try { fetchCancelQuote(id, setCancelFee, graceTimer) } catch {}
            if (ev.data.status === 'COMPLETED') fetchReceiptFor(id, setReceipt)
          }
          if ((ev.event || ev?.data?.type) === 'LOCATION' && ev?.data?.lat != null && ev?.data?.lng != null) setDriverLoc({ lat: Number(ev.data.lat), lng: Number(ev.data.lng) })
        }
      }).catch(()=>{})
    } catch (e: any) { setError(e?.message || 'Error') }
  })() }, [id])

  if (!id) return <div>Sin id</div>
  if (error) return <div style={{color:'var(--danger)'}}>{error}</div>
  if (!trip) return (
    <div>
      <h2>Mi viaje</h2>
      <SkeletonLines lines={2} />
      <div style={{marginTop:10}}>
        <SkeletonBlock height={360} />
      </div>
      <div className="row" style={{gap:8, marginTop:10}}>
        <SkeletonBlock height={32} width={140} />
        <SkeletonBlock height={32} width={120} />
      </div>
    </div>
  )
  const origin = trip.pickupLat && trip.pickupLng ? { lat: Number(trip.pickupLat), lng: Number(trip.pickupLng) } : null
  const dest = trip.dropoffLat && trip.dropoffLng ? { lat: Number(trip.dropoffLat), lng: Number(trip.dropoffLng) } : null
  const driverPos = driverLoc && driverLoc.lat != null && driverLoc.lng != null ? { lat: Number(driverLoc.lat), lng: Number(driverLoc.lng) } : undefined
  return (
    <div>
      <h2>Mi viaje</h2>
      <div className="muted">ID: {trip.id}</div>
      <div className="muted">Estado: {trip.status}</div>
      <StatusStepper status={trip.status} />
      {cancelFee && (
        <div className="row" style={{gap:8, alignItems:'center', marginTop:6}}>
          {typeof cancelFee.graceRemainingSec === 'number' && cancelFee.graceRemainingSec > 0 ? (
            <div className="card" style={{padding:'4px 8px'}}>Ventana de gracia: {fmtSec(cancelFee.graceRemainingSec)}</div>
          ) : (
            <div className="muted">{cancelFee.feeUsd > 0 ? `Tarifa de cancelación estimada: $${cancelFee.feeUsd.toFixed(2)}` : 'Cancelación sin tarifa'}</div>
          )}
        </div>
      )}
      <TripEtas trip={trip} driverLoc={driverLoc} />
      <div style={{marginTop:10}}>
        <LiveMap origin={origin} destination={dest} driver={driverPos} height={360} controls={true} />
      </div>
      <div style={{marginTop:10}}>
        {trip.status !== 'STARTED' && trip.status !== 'COMPLETED' && trip.status !== 'CANCELED' && (
          <button className="btn danger" aria-label="Cancelar viaje" onClick={() => confirmAndCancel(trip, id, show, setTrip)}>Cancelar viaje</button>
        )}
        <button className="btn secondary" aria-label="Ver recibo" onClick={async () => { await fetchReceiptFor(id, setReceipt); if (!receipt) show('Recibo cargado', 'success') }} style={{marginLeft:8}}>Ver recibo</button>
        {receipt && (
          <div className="card" style={{marginTop:8}}>
            <div className="muted">Monto: ${Number(receipt.amountUsd||0).toFixed(2)} {receipt.currency || 'USD'}</div>
            <div className="muted">Pago: {receipt.status || '-' } {receipt.method ? `• ${receipt.method}` : ''}</div>
            <div className="muted">Fecha: {new Date(receipt.createdAt).toLocaleString()}</div>
          </div>
        )}
      </div>
    </div>
  )
}

async function fetchReceiptFor(id: string, set: (r: any|null)=>void) {
  try {
    const token = getValidToken(); if (!token) return
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
    const res = await fetch(`${base}/payments/${encodeURIComponent(id)}/receipt`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
    if (!res.ok) return
    const body = await res.json()
    set(body)
  } catch {}
}

async function confirmAndCancel(trip: any, id: string, show: (t:string,k?:any)=>void, setTrip: (fn: any) => void) {
  try {
    const token = getValidToken(); if (!token) return
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
    const res = await fetch(`${base}/rider/trips/${encodeURIComponent(id)}/cancel/quote`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
    let msg = '¿Cancelar el viaje?'
    if (res.ok) {
      const q = await res.json()
      if (q && q.cancellable) {
        if (q.feeUsd && q.feeUsd > 0) msg = `Se aplicará una tarifa de cancelación de $${Number(q.feeUsd).toFixed(2)}. ¿Deseas cancelar?`
        else if (typeof q.graceRemainingSec === 'number' && q.graceRemainingSec > 0) msg = `Aún dentro de la ventana de gracia (${q.graceRemainingSec}s). No se cobrará tarifa. ¿Cancelar?`
      } else { msg = 'Este viaje ya no puede cancelarse.' }
    }
    if (!confirm(msg)) return
    cancelTrip(id, show, setTrip)
  } catch {
    if (!confirm('¿Cancelar el viaje?')) return
    cancelTrip(id, show, setTrip)
  }
}

async function cancelTrip(id: string, show: (t:string,k?:any)=>void, setTrip: (fn: any) => void) {
  try {
    const token = getValidToken(); if (!token) return
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
    const res = await fetch(`${base}/trips/${encodeURIComponent(id)}/cancel`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ reason: 'DEMO' }) })
    if (!res.ok) { show('No se pudo cancelar', 'error'); return }
    const body = await res.json()
    setTrip((t:any)=> t ? { ...t, status: (body?.trip?.status || 'CANCELED') } : t)
    show('Viaje cancelado', 'success')
  } catch { show('No se pudo cancelar', 'error') }
}

async function fetchCancelQuote(id: string, set: (v: any)=>void, timerRef: any) {
  const token = getValidToken(); if (!token) return
  const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
  try {
    const res = await fetch(`${base}/rider/trips/${encodeURIComponent(id)}/cancel/quote`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
    if (!res.ok) return
    const q = await res.json()
    set({ feeUsd: Number(q.feeUsd||0), graceRemainingSec: typeof q.graceRemainingSec==='number'?q.graceRemainingSec:null, cancellable: !!q.cancellable })
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    if (typeof q.graceRemainingSec === 'number' && q.graceRemainingSec > 0) {
      timerRef.current = setInterval(() => {
        set((prev: any) => {
          if (!prev) return prev
          const next = Math.max(0, Number(prev.graceRemainingSec||0) - 1)
          return { ...prev, graceRemainingSec: next }
        })
      }, 1000)
    }
  } catch {}
}

function fmtSec(s: number) {
  const m = Math.floor(s/60); const r = s % 60
  return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`
}

function TripEtas({ trip, driverLoc }: { trip: any, driverLoc: { lat: number|null, lng: number|null } | null }) {
  const speedKmh = 28 // heurística urbana
  const toKm = (a: any, b: any) => {
    if (!a || !b || a.lat == null || a.lng == null || b.lat == null || b.lng == null) return null
    const R = 6371; const dLat = deg2rad(b.lat - a.lat); const dLon = deg2rad(b.lng - a.lng)
    const aa = Math.sin(dLat/2)**2 + Math.cos(deg2rad(a.lat))*Math.cos(deg2rad(b.lat))*Math.sin(dLon/2)**2
    const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa))
    return R * c
  }
  const deg2rad = (d: number) => d * Math.PI / 180
  const pickup = trip.pickupLat && trip.pickupLng ? { lat: Number(trip.pickupLat), lng: Number(trip.pickupLng) } : null
  const drop = trip.dropoffLat && trip.dropoffLng ? { lat: Number(trip.dropoffLat), lng: Number(trip.dropoffLng) } : null
  const dToPickup = driverLoc && pickup ? toKm(driverLoc, pickup) : null
  const legKm = pickup && drop ? toKm(pickup, drop) : null
  const etaMin = (km: number | null) => km == null ? null : Math.round((km / speedKmh) * 60)
  return (
    <div className="muted" style={{marginTop:6}}>
      {dToPickup != null && <span>Distancia a recogida: {dToPickup.toFixed(2)} km • ETA ~{etaMin(dToPickup)} min. </span>}
      {legKm != null && <span>Trayecto estimado: {legKm.toFixed(2)} km • ~{etaMin(legKm)} min.</span>}
    </div>
  )
}

function StatusStepper({ status }: { status: string }) {
  const steps = ['REQUESTED','ASSIGNED','ACCEPTED','ARRIVED','STARTED','COMPLETED']
  const idx = steps.indexOf(status)
  return (
    <div className="row" style={{gap:6, marginTop:6, flexWrap:'wrap', alignItems:'center'}}>
      {steps.map((s,i)=>(
        <div key={s} style={{display:'flex', alignItems:'center'}}>
          <div className="card" style={{padding:'4px 8px', background: i<=idx ? 'var(--brand-weak)' : undefined}}>{s}</div>
          {i<steps.length-1 && <span style={{margin:'0 4px'}}>›</span>}
        </div>
      ))}
      {status==='CANCELED' && <div className="card" style={{padding:'4px 8px', background:'var(--danger-weak)', color:'var(--danger)'}}>CANCELED</div>}
    </div>
  )
}
