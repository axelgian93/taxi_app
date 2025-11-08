'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BookPage() {
  const [city, setCity] = useState('Guayaquil')
  const [origin, setOrigin] = useState('')
  const [dest, setDest] = useState('')
  const parse = (v: string) => {
    const [a,b] = String(v||'').split(',').map(s=>Number(s.trim()))
    if (!isFinite(a) || !isFinite(b)) return null
    if (a < -90 || a > 90 || b < -180 || b > 180) return null
    return { lat: a, lng: b }
  }
  const o = parse(origin)
  const d = parse(dest)
  const href = o && d ? `/admin/demo?city=${encodeURIComponent(city)}&olat=${encodeURIComponent(String(o.lat))}&olng=${encodeURIComponent(String(o.lng))}&dlat=${encodeURIComponent(String(d.lat))}&dlng=${encodeURIComponent(String(d.lng))}` : ''
  return (
    <div className="card" style={{maxWidth:560, margin:'40px auto'}}>
      <h2>Reserva rápida</h2>
      <p className="muted">Widget de ejemplo para solicitar un viaje (demo). Para operar el viaje, usa el panel Rider.</p>
      <div className="row" style={{flexDirection:'column', gap:10}}>
        <label>
          <div className="muted">Ciudad</div>
          <input value={city} onChange={e=>setCity(e.target.value)} />
        </label>
        <label>
          <div className="muted">Origen (lat,lng)</div>
          <input placeholder="-2.170998,-79.922359" value={origin} onChange={e=>setOrigin(e.target.value)} />
        </label>
        <label>
          <div className="muted">Destino (lat,lng)</div>
          <input placeholder="-2.185,-79.9" value={dest} onChange={e=>setDest(e.target.value)} />
        </label>
        <div className="row" style={{gap:8}}>
          {o && d ? (
            <Link className="btn" href={href as any}>Abrir en Simulador</Link>
          ) : (
            <button className="btn" disabled>Completa origen y destino válidos</button>
          )}
          <Link className="btn secondary" href="/rider/request">Ir al panel Rider</Link>
        </div>
      </div>
    </div>
  )
}
