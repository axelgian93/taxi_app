'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { apiFetch } from '@/src/lib/api'
import { getUser, getValidToken, isTokenExpired } from '@/src/lib/auth'
import { SkeletonBlock, SkeletonLines } from '@/src/components/Skeleton'

type Trip = {
  id: string
  status: string
  riderId: string | null
  driverId: string | null
  city?: string | null
  requestedAt?: string | null
}

type TripsResp = { items: Trip[], nextCursor?: string }

export default function AdminTripsPage() {
  const [items, setItems] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const [hasMore, setHasMore] = useState(false)
  const [qId, setQId] = useState('')
  const search = useSearchParams()
  const router = useRouter()

  const [status, setStatus] = useState<string>(search.get('status') || '')
  const [city, setCity] = useState<string>(search.get('city') || '')
  const [from, setFrom] = useState<string>(search.get('from') || '')
  const [to, setTo] = useState<string>(search.get('to') || '')
  const [pagesWanted, setPagesWanted] = useState<number>(() => {
    const p = Number(search.get('pages') || '1')
    return isFinite(p) && p >= 1 ? Math.floor(p) : 1
  })

  const queryString = useMemo(() => {
    const p = new URLSearchParams()
    p.set('limit', '50')
    if (status) p.set('status', status)
    if (city) p.set('city', city)
    if (from) p.set('from', from)
    if (to) p.set('to', to)
    return p.toString()
  }, [status, city, from, to])

  const [autoRefresh, setAutoRefresh] = useState(true)
  const [highlights, setHighlights] = useState<Record<string, number>>({})

  const filteredItems = useMemo(() => {
    const fromTs = from ? Date.parse(from) : null
    const toTs = to ? Date.parse(to + 'T23:59:59') : null
    return items.filter(t => {
      if (status && t.status !== status) return false
      if (city && (t.city || '').toLowerCase() !== city.toLowerCase()) return false
      if (fromTs || toTs) {
        const ts = t.requestedAt ? Date.parse(t.requestedAt) : NaN
        if (!isFinite(ts)) return false
        if (fromTs && ts < fromTs) return false
        if (toTs && ts > toTs) return false
      }
      if (qId && !t.id.toLowerCase().includes(qId.trim().toLowerCase())) return false
      return true
    })
  }, [items, status, city, from, to, qId])

  useEffect(() => {
    const user = getUser()
    if (!user) { location.replace('/login'); return }
    if (user.role !== 'ADMIN') { setError('Acceso solo para ADMIN'); setLoading(false); return }
    const token = getValidToken()
    if (!token) { location.replace('/login'); return }

    // Reflejar filtros en URL
    const url = new URL(location.href)
    const p = new URLSearchParams(queryString)
    if (pagesWanted && pagesWanted > 1) p.set('pages', String(pagesWanted))
    url.search = p.toString()
    window.history.replaceState(null, '', url.toString())

    apiFetch<TripsResp>(`/admin/trips?${queryString}`, {}, token)
      .then(resp => {
        setItems(resp.items || [])
        setCursor(resp.nextCursor)
        setHasMore(!!resp.nextCursor)
      })
      .catch(err => setError(err?.message || 'Error al cargar trips'))
      .finally(() => setLoading(false))
  }, [queryString, pagesWanted])

  // Auto-cargar más páginas si ?pages=N > 1
  useEffect(() => {
    const want = Math.max(1, pagesWanted)
    const loaded = Math.max(1, Math.ceil((items.length || 0) / 50))
    if (!hasMore) return
    if (loaded >= want) return
    let cancelled = false
    const pump = async () => {
      for (let i = loaded; i < want && !cancelled; i++) {
        await loadMore()
      }
    }
    pump()
    return () => { cancelled = true }
  }, [pagesWanted, items.length, hasMore])

  useEffect(() => {
    if (!autoRefresh) return
    let cancelled = false
    const tick = async () => {
      const token = getValidToken()
      if (!token) return
      try {
        const resp = await apiFetch<TripsResp>(`/admin/trips?${queryString}`, {}, token)
        if (cancelled) return
        setItems(prev => {
          const prevMap = new Map(prev.map(it => [it.id, it]))
          const next = resp.items || []
          const changed: string[] = []
          const merged = next.map(n => {
            const p = prevMap.get(n.id)
            if (!p) { changed.push(n.id); return n }
            if (p.status !== n.status || p.driverId !== n.driverId || p.riderId !== n.riderId) {
              changed.push(n.id)
              return { ...p, ...n }
            }
            return { ...p, ...n }
          })
          const nextIds = new Set(next.map(i => i.id))
          const trailing = prev.filter(it => !nextIds.has(it.id))
          const result = [...merged, ...trailing]
          if (changed.length) {
            const now = Date.now()
            setHighlights(h => {
              const copy = { ...h }
              changed.forEach(id => { copy[id] = now + 2500 })
              return copy
            })
            setTimeout(() => {
              setHighlights(h => {
                const t = Date.now()
                const out: Record<string, number> = {}
                for (const [k, v] of Object.entries(h)) if (v > t) out[k] = v
                return out
              })
            }, 3000)
          }
          setCursor(resp.nextCursor)
          setHasMore(!!resp.nextCursor)
          return result
        })
      } catch {}
    }
    const id = setInterval(tick, 5000)
    tick()
    return () => { cancelled = true; clearInterval(id) }
  }, [autoRefresh, queryString])

  async function loadMore() {
    const token = getValidToken()
    if (!token || !cursor) return
    setLoading(true)
    try {
      const sep = queryString ? `&` : ''
      const resp = await apiFetch<TripsResp>(`/admin/trips?${queryString}${sep}cursor=${encodeURIComponent(cursor)}`, {}, token)
      setItems(prev => [...prev, ...(resp.items || [])])
      setCursor(resp.nextCursor)
      setHasMore(!!resp.nextCursor)
    } catch (err: any) {
      setError(err?.message || 'Error al cargar más trips')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div>
      <h2>Trips</h2>
      <div className="card" style={{marginTop:10}}>
        <div className="row" style={{gap:8}}>
          <SkeletonBlock height={32} width={140} />
          <SkeletonBlock height={32} width={140} />
          <SkeletonBlock height={32} width={180} />
          <SkeletonBlock height={32} width={180} />
        </div>
      </div>
      <div className="table-wrap" style={{marginTop:10}}>
        <SkeletonBlock height={240} />
      </div>
    </div>
  )
  if (error) return <div style={{color:'var(--danger)'}}>{error}</div>
  return (
    <div>
      <h2>Trips</h2>
      <div className="row" style={{justifyContent:'space-between', margin:'8px 0', alignItems:'center'}}>
        <div className="row" style={{gap:8, flexWrap:'wrap'}}>
          {(['','REQUESTED','ASSIGNED','ACCEPTED','ARRIVED','STARTED','COMPLETED','CANCELED'] as const).map(s => (
            <button key={s||'ALL'} className={`btn ${status===s ? '' : 'secondary'}`} onClick={()=>setStatus(s)} aria-pressed={status===s} aria-label={`Filtro ${s||'Todos'}`}>{s||'Todos'}</button>
          ))}
          <label className="row" style={{gap:6, alignItems:'center'}}>
            <span className="muted">Buscar ID</span>
            <input aria-label="Buscar por ID" placeholder="trp_..." value={qId} onChange={e=>setQId(e.target.value)} />
          </label>
        </div>
        <button className="btn secondary" onClick={() => exportCsv(filteredItems)} style={{marginRight:8}}>Export CSV</button>
        <button className="btn secondary" onClick={() => setAutoRefresh(a => !a)}>
          {autoRefresh ? 'Pausar' : 'Reanudar'} auto-refresh
        </button>
      </div>
      <Filters
        status={status}
        city={city}
        from={from}
        to={to}
        onChange={(next) => {
          setItems([])
          setCursor(undefined)
          setHasMore(false)
          setStatus(next.status)
          setCity(next.city)
          setFrom(next.from)
          setTo(next.to)
          const p = new URLSearchParams()
          if (next.status) p.set('status', next.status)
          if (next.city) p.set('city', next.city)
          if (next.from) p.set('from', next.from)
          if (next.to) p.set('to', next.to)
          p.set('pages', '1')
          const qs = p.toString()
          router.replace((`/admin/trips${qs ? `?${qs}` : ''}`) as any)
        }}
      />
      {filteredItems.length === 0 && !loading ? (
        <div className="muted" style={{marginTop:8}}>Sin resultados con los filtros actuales.</div>
      ) : null}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Rider</th>
            <th>Driver</th>
            <th>Ciudad</th>
            <th>Requested</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(t => (
            <tr key={t.id} className={highlights[t.id] ? 'flash' : ''}>
              <td><Link href={`/admin/trips/${t.id}`}>{t.id}</Link></td>
              <td>{t.status}</td>
              <td className="muted">{t.riderId || '-'}</td>
              <td className="muted">{t.driverId || '-'}</td>
              <td className="muted">{t.city || '-'}</td>
              <td className="muted">{formatDate(t.requestedAt)}</td>
              <td>
                <button
                  className="btn secondary"
                  disabled={t.status === 'COMPLETED' || t.status === 'CANCELED' || loading}
                  onClick={() => cancelTripFromList(t.id)}
                >Cancelar</button>
              </td>
            </tr>
          ))}
          {loading && (
            <tr>
              <td colSpan={7}>
                <div className="row" style={{gap:8}}>
                  <SkeletonBlock height={18} width={120} />
                  <SkeletonBlock height={18} width={200} />
                  <SkeletonBlock height={18} width={160} />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{marginTop:12}}>
        {hasMore ? (
          <button className="btn" onClick={loadMore} disabled={loading}>
            {loading ? 'Cargando…' : 'Cargar más'}
          </button>
        ) : (
          <span className="muted">No hay más resultados</span>
        )}
      </div>
    </div>
  )
}

function formatDate(iso?: string | null) {
  if (!iso) return '-'
  try { return new Date(iso).toLocaleString() } catch { return iso }
}

function Filters(props: { status: string, city: string, from: string, to: string, onChange: (v: {status: string, city: string, from: string, to: string}) => void }) {
  const { status, city, from, to, onChange } = props
  return (
    <div className="card" style={{margin:'12px 0'}}>
      <div className="row" style={{flexWrap:'wrap', gap:16}}>
        <label>
          <div className="muted">Estado</div>
          <select value={status} onChange={e=>onChange({ status: e.target.value, city, from, to })}>
            <option value="">Todos</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="ARRIVED">ARRIVED</option>
            <option value="STARTED">STARTED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </label>
        <label>
          <div className="muted">Ciudad</div>
          <input value={city} onChange={e=>onChange({ status, city: e.target.value, from, to })} placeholder="Guayaquil" style={{padding:6, borderRadius:8}} />
        </label>
        <label>
          <div className="muted">Desde</div>
          <input type="date" value={from} onChange={e=>onChange({ status, city, from: e.target.value, to })} />
        </label>
        <label>
          <div className="muted">Hasta</div>
          <input type="date" value={to} onChange={e=>onChange({ status, city, from, to: e.target.value })} />
        </label>
        <button className="btn secondary" onClick={() => onChange({ status: '', city: '', from: '', to: '' })}>Limpiar</button>
      </div>
    </div>
  )
}

function exportCsv(items: any[]) {
  const headers = ['id','status','riderId','driverId','city','requestedAt']
  const rows = items.map(t => headers.map(h => String(t[h] ?? '')))
  const csv = [headers.join(','), ...rows.map(r => r.map(v => /[,"]/.test(v) ? `"${v.replace(/"/g,'""')}"` : v).join(','))].join('\n') + '\n'
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `trips_export_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

async function cancelTripFromList(id: string) {
  if (!confirm('¿Cancelar este viaje?')) return
  const custom = prompt('Motivo de cancelación (opcional):', 'ADMIN_PANEL')
  const token = getValidToken()
  if (!token) { location.href = '/login'; return }
  try {
    await apiFetch(`/trips/${encodeURIComponent(id)}/cancel`, { method: 'POST', body: JSON.stringify({ reason: (custom || 'ADMIN_PANEL') }) }, token)
    // fuerza refresco de la fila afectada volviendo a cargar primer página
    location.href = location.href
  } catch (e: any) {
    alert(e?.message || 'No se pudo cancelar')
  }
}
