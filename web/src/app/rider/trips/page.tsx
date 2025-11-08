'use client'
import { useEffect, useState } from 'react'
import { getValidToken } from '@/src/lib/auth'
import { apiFetch } from '@/src/lib/api'
import Link from 'next/link'
import { SkeletonBlock, SkeletonLines } from '@/src/components/Skeleton'

type Item = { id: string, status: string, requestedAt: string, completedAt?: string|null, costUsd?: number|null, currency?: string|null, preferredMethod?: 'CASH'|'CARD'|null }
type Resp = { items: Item[], nextCursor?: string|null }

export default function RiderTripsList() {
  const [items, setItems] = useState<Item[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'ALL'|'ACTIVE'|'COMPLETED'|'CANCELED'>('ALL')
  const [searchId, setSearchId] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  useEffect(() => { (async () => {
    try {
      const token = getValidToken(); if (!token) { location.href = '/rider/login'; return }
      const resp = await apiFetch<Resp>(`/rider/my-trips?limit=20`, {}, token)
      setItems(resp.items || [])
      setCursor(resp.nextCursor || null)
      setHasMore(Boolean(resp.nextCursor))
    } catch (e: any) { setError(e?.message || 'Error') } finally { setLoading(false) }
  })() }, [])

  async function loadMore() {
    const token = getValidToken(); if (!token || !cursor) return
    setLoading(true)
    try {
      const resp = await apiFetch<Resp>(`/rider/my-trips?limit=20&cursor=${encodeURIComponent(cursor)}`, {}, token)
      setItems(prev => prev.concat(resp.items || []))
      setCursor(resp.nextCursor || null)
      setHasMore(Boolean(resp.nextCursor))
    } catch (e: any) { setError(e?.message || 'Error') } finally { setLoading(false) }
  }

  if (loading) return (
    <div>
      <h2>Mis viajes</h2>
      <div className="card" style={{marginTop:10}}>
        <SkeletonLines lines={2} />
      </div>
      <div className="table-wrap" style={{marginTop:10}}>
        <SkeletonBlock height={240} />
      </div>
    </div>
  )
  if (error) return <div style={{color:'var(--danger)'}}>{error}</div>
  const filtered = items.filter(it => applyFilter(it, filter, searchId, fromDate, toDate))
  const summary = {
    total: filtered.length,
    completed: filtered.filter(i => i.status === 'COMPLETED').length,
    canceled: filtered.filter(i => i.status === 'CANCELED').length,
  }
  return (
    <div>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h2>Mis viajes</h2>
        <div className="row" style={{gap:8}}>
          <button className="btn secondary" onClick={() => exportCsv(filtered)} aria-label="Exportar viajes filtrados a CSV">Export CSV</button>
          <Link className="btn" href="/rider/request" aria-label="Solicitar nuevo viaje">Solicitar viaje</Link>
        </div>
      </div>
      <div className="card" style={{marginTop:8}}>
        <div className="row" style={{gap:16, flexWrap:'wrap'}}>
          <div><div className="muted">Total</div><div style={{fontWeight:600}}>{summary.total}</div></div>
          <div><div className="muted">Completados</div><div style={{fontWeight:600}}>{summary.completed}</div></div>
          <div><div className="muted">Cancelados</div><div style={{fontWeight:600}}>{summary.canceled}</div></div>
        </div>
      </div>
      <div className="row" style={{gap:8, margin:'8px 0'}}>
        {(['ALL','ACTIVE','COMPLETED','CANCELED'] as const).map(f => (
          <button key={f} className={`btn ${filter===f ? '' : 'secondary'}`} onClick={()=>setFilter(f)} aria-pressed={filter===f} aria-label={`Filtrar ${f}`}>{f==='ALL'?'Todos':f==='ACTIVE'?'Activos':f==='COMPLETED'?'Completados':'Cancelados'}</button>
        ))}
      </div>
      <div className="card" style={{margin:'8px 0'}}>
        <div className="row" style={{gap:12, flexWrap:'wrap'}}>
          <label>
            <div className="muted">Buscar por ID</div>
            <input aria-label="Buscar viaje por ID" placeholder="trp_..." value={searchId} onChange={e=>setSearchId(e.target.value)} />
          </label>
          <label>
            <div className="muted">Desde</div>
            <input type="date" aria-label="Fecha desde" value={fromDate} onChange={e=>setFromDate(e.target.value)} />
          </label>
          <label>
            <div className="muted">Hasta</div>
            <input type="date" aria-label="Fecha hasta" value={toDate} onChange={e=>setToDate(e.target.value)} />
          </label>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="muted">Aún no tienes viajes. <Link href="/rider/request">Solicitar uno</Link></div>
      ) : (
        <table className="table" aria-label="Lista de viajes">
          <thead><tr><th>ID</th><th>Status</th><th>Fecha</th><th>Total</th><th>Pago</th><th></th></tr></thead>
          <tbody>
            {filtered.map(it => (
              <tr key={it.id}>
                <td>{it.id}</td>
                <td>{renderStatus(it.status)}</td>
                <td className="muted">{new Date(it.requestedAt).toLocaleString()}</td>
                <td className="muted">{it.costUsd != null ? `$${Number(it.costUsd).toFixed(2)}` : '-'}</td>
                <td>{renderMethod(it.preferredMethod)}</td>
                <td><Link className="btn secondary" href={`/rider/trip/${it.id}`} aria-label={`Ver viaje ${it.id}`}>Ver</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {hasMore && <div style={{marginTop:8}}><button className="btn" onClick={loadMore} disabled={loading} aria-label="Cargar más viajes">{loading?'Cargando…':'Cargar más'}</button></div>}
    </div>
  )
}

function applyFilter(it: Item, f: 'ALL'|'ACTIVE'|'COMPLETED'|'CANCELED', q: string, fromDate: string, toDate: string) {
  if (f === 'ALL') return true
  let ok = true
  if (f === 'COMPLETED') ok = ok && it.status === 'COMPLETED'
  else if (f === 'CANCELED') ok = ok && it.status === 'CANCELED'
  else ok = ok && it.status !== 'COMPLETED' && it.status !== 'CANCELED'
  if (q && !it.id.toLowerCase().includes(q.trim().toLowerCase())) ok = false
  if (fromDate) {
    const ts = Date.parse(it.requestedAt)
    const fromTs = Date.parse(fromDate)
    if (isFinite(ts) && isFinite(fromTs)) { if (ts < fromTs) ok = false }
  }
  if (toDate) {
    const ts = Date.parse(it.requestedAt)
    const toTs = Date.parse(toDate + 'T23:59:59')
    if (isFinite(ts) && isFinite(toTs)) { if (ts > toTs) ok = false }
  }
  return ok
}

function exportCsv(rows: Item[]) {
  try {
    const headers = ['id','status','requestedAt','completedAt','costUsd','currency','preferredMethod']
    const esc = (v: any) => {
      if (v == null) return ''
      const s = String(v)
      if (s.includes(',') || s.includes('"') || s.includes('\n')) return '"' + s.replace(/"/g,'""') + '"'
      return s
    }
    const lines = [headers.join(',')].concat(rows.map(r => headers.map(h => esc((r as any)[h])).join(',')))
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mis_viajes_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch {}
}

function renderStatus(s: string) {
  const map: Record<string, { text: string, color: string }> = {
    REQUESTED: { text: 'Solicitado', color: '#9aa4b2' },
    ASSIGNED: { text: 'Asignado', color: '#06b6d4' },
    ACCEPTED: { text: 'Aceptado', color: '#4f46e5' },
    ARRIVED: { text: 'Llegó', color: '#22c55e' },
    STARTED: { text: 'En curso', color: '#eab308' },
    COMPLETED: { text: 'Completado', color: '#22c55e' },
    CANCELED: { text: 'Cancelado', color: '#ef4444' },
  }
  const m = map[s] || { text: s, color: '#9aa4b2' }
  return <span style={{padding:'2px 8px', borderRadius:999, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:m.color}}>{m.text}</span>
}

function renderMethod(m?: 'CASH'|'CARD'|null) {
  if (!m) return <span className="muted">-</span>
  const color = m === 'CARD' ? '#06b6d4' : '#9aa4b2'
  const label = m === 'CARD' ? 'Tarjeta' : 'Efectivo'
  return <span style={{padding:'2px 8px', borderRadius:999, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color}}>{label}</span>
}
