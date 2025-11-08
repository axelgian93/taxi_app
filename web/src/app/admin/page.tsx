'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getValidToken } from '@/src/lib/auth'

export default function AdminHome() {
  const [kpis, setKpis] = useState<{ gmv: number, trips: number, cancelRate: number } | null>(null)
  useEffect(() => { (async () => {
    try {
      const token = getValidToken(); if (!token) return
      const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
      const [rev, ana] = await Promise.all([
        fetch(`${base}/admin/revenue/report?groupBy=city&limit=1&format=json`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }).then(r => r.json()).catch(()=>({items:[]})),
        fetch(`${base}/admin/analytics/trips`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }).then(r => r.json()).catch(()=>({total:0,cancelRate:0}))
      ])
      const gmv = Array.isArray(rev.items) ? Number(rev.items.reduce((a:any,r:any)=>a+Number(r.amountUsd||0),0)) : 0
      setKpis({ gmv, trips: Number(ana.total||0), cancelRate: Number(ana.cancelRate||0) })
    } catch {}
  })() }, [])
  return (
    <div>
      <h2>Panel Admin</h2>
      <div className="row" style={{gap:12, flexWrap:'wrap'}}>
        <Kpi title="GMV (USD)" value={kpis ? `$${kpis.gmv.toFixed(2)}` : '—'} />
        <Kpi title="# Trips" value={kpis ? String(kpis.trips) : '—'} />
        <Kpi title="Cancel rate" value={kpis ? `${(kpis.cancelRate*100).toFixed(1)}%` : '—'} />
      </div>
      <div className="card" style={{marginTop:12}}>
        <strong>Accesos rápidos</strong>
        <div className="row" style={{gap:10, flexWrap:'wrap', marginTop:8}}>
          <Link className="btn" href="/admin/demo?city=Guayaquil&olat=-2.170998&olng=-79.922359&dlat=-2.185&dlng=-79.900">Crear viaje demo (Guayaquil)</Link>
          <Link className="btn" href="/admin/demo?city=Quito&olat=-0.180653&olng=-78.467834&dlat=-0.190&dlng=-78.450">Crear viaje demo (Quito)</Link>
          <Link className="btn" href="/admin/demo?city=Cuenca&olat=-2.900550&olng=-79.004530&dlat=-2.910&dlng=-79.000">Crear viaje demo (Cuenca)</Link>
          <Link className="btn" href="/admin/demo">Demo de Viaje</Link>
          <Link className="btn" href="/admin/ops">Operaciones</Link>
          <Link className="btn" href="/admin/trips">Trips</Link>
          <Link className="btn" href="/admin/tariffs">Tarifas</Link>
          <Link className="btn" href="/admin/reports">Reportes</Link>
          <Link className="btn secondary" href="/admin/readme">Guía de Demo</Link>
        </div>
      </div>
      <div className="card" style={{marginTop:12}}>
        <strong>Checklist para la demo</strong>
        <ol>
          <li>Seed: Admin/Rider/Drivers (Start Demo)</li>
          <li>Simular un viaje en "Demo de Viaje" (origen/destino, solicitar y avanzar estados)</li>
          <li>Ver el trip en Operaciones (SSE en vivo)</li>
          <li>Verlo en Trips y Reportes</li>
        </ol>
      </div>
    </div>
  )
}

function Kpi({ title, value }: { title: string, value: string }) {
  return (
    <div className="card" style={{padding:'10px 14px', minWidth:160}}>
      <div className="muted" style={{marginBottom:4}}>{title}</div>
      <div style={{fontSize:22, fontWeight:600}}>{value}</div>
    </div>
  )
}
