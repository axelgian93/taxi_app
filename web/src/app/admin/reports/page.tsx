'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getUser, getValidToken } from '@/src/lib/auth'
import { SkeletonBlock, SkeletonLines } from '@/src/components/Skeleton'

type Row = Record<string, any> & { amountUsd: number, count: number }
type Resp = { items: Row[] }

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'

export default function ReportsPage() {
  const router = useRouter()
  const search = useSearchParams()
  const hasInit = useRef(false)
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [method, setMethod] = useState<string>('')
  const [groupBy, setGroupBy] = useState<'city'|'method'|'city_method'|'day'|'city_day'>('city_method')
  const [limit, setLimit] = useState<number>(1000)
  const [compare, setCompare] = useState<boolean>(false)
  const [items, setItems] = useState<Row[]>([])
  const [prevItems, setPrevItems] = useState<Row[]>([])
  const [dayItems, setDayItems] = useState<Row[]>([])
  const [cityItems, setCityItems] = useState<Row[]>([])
  const [methodItems, setMethodItems] = useState<Row[]>([])
  const [analyticsCity, setAnalyticsCity] = useState<any[]>([])
  const [analyticsDay, setAnalyticsDay] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dims = useMemo(() => dimsFor(groupBy), [groupBy])
  const series = useMemo(() => buildSeries(items, dims), [items, dims])
  const prevSeries = useMemo(() => buildSeries(prevItems, dims), [prevItems, dims])
  const countTotals = useMemo(() => buildCountTotals(items, dims), [items, dims])
  const prevCountTotals = useMemo(() => buildCountTotals(prevItems, dims), [prevItems, dims])
  const daySeries = useMemo(() => buildSeries(dayItems, dimsFor('day')), [dayItems])
  const citySeries = useMemo(() => buildSeries(cityItems, dimsFor('city')), [cityItems])
  const methodSeries = useMemo(() => buildSeries(methodItems, dimsFor('method')), [methodItems])
  const kpis = useMemo(() => computeKpis(items), [items])
  const prevKpis = useMemo(() => computeKpis(prevItems), [prevItems])
  const [tripSummary, setTripSummary] = useState<{ total: number, completed: number, canceled: number, completionRate: number, cancelRate: number } | null>(null)

  // Initialize from URL once
  useEffect(() => {
    if (hasInit.current) return
    hasInit.current = true
    const q = new URLSearchParams(search as any)
    const f = q.get('from')
    const t = q.get('to')
    const c = q.get('city')
    const m = q.get('method')
    const g = q.get('groupBy') as any
    const l = q.get('limit')
    const cmp = q.get('compare')
    if (f) setFrom(f)
    if (t) setTo(t)
    if (c) setCity(c)
    if (m) setMethod(m)
    if (g && ['city','method','city_method','day','city_day'].includes(g)) setGroupBy(g)
    if (l && !isNaN(Number(l))) setLimit(Number(l))
    if (cmp === '1') setCompare(true)
  }, [search])

  // Reflect filters in URL
  useEffect(() => {
    const p = new URLSearchParams()
    if (from) p.set('from', from)
    if (to) p.set('to', to)
    if (city) p.set('city', city)
    if (method) p.set('method', method)
    p.set('groupBy', groupBy)
    p.set('limit', String(limit))
    if (compare) p.set('compare', '1')
    const qs = p.toString()
    router.replace((`/admin/reports${qs ? `?${qs}` : ''}`) as any)
  }, [from, to, city, method, groupBy, limit, compare])

  useEffect(() => {
    const user = getUser()
    if (!user) { location.replace('/login'); return }
    if (user.role !== 'ADMIN') { setError('Acceso solo para ADMIN'); return }
  }, [])

  if (loading) {
    return (
      <div>
        <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <h2>Reportes</h2>
          <div className="row" style={{gap:8}}>
            <SkeletonBlock height={32} width={120} />
            <SkeletonBlock height={32} width={140} />
          </div>
        </div>
        <div className="card" style={{marginTop:10}}>
          <SkeletonLines lines={2} />
        </div>
        <div className="card" style={{marginTop:10}}>
          <SkeletonBlock height={260} />
        </div>
        <div className="row" style={{gap:10, marginTop:10, flexWrap:'wrap'}}>
          <SkeletonBlock height={180} width={280} />
          <SkeletonBlock height={180} width={280} />
          <SkeletonBlock height={180} width={280} />
        </div>
      </div>
    )
  }

  async function load() {
    setError(null)
    const token = getValidToken()
    if (!token) { location.href = '/login'; return }
    setLoading(true)
    try {
      const p = new URLSearchParams()
      if (from) p.set('from', new Date(from).toISOString())
      if (to) p.set('to', new Date(to + 'T23:59:59').toISOString())
      if (city) p.set('city', city)
      if (method) p.set('method', method)
      p.set('groupBy', groupBy)
      p.set('format', 'json')
      p.set('limit', String(limit))
      const res = await fetch(`${API}/admin/revenue/report?${p}`, {
        headers: { 'Authorization': `Bearer ${getValidToken()}` }, cache: 'no-store'
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const body: Resp = await res.json()
      const curItems = Array.isArray(body.items) ? body.items : []
      setItems(curItems)

      // Compare vs previous period
      setPrevItems([])
      if (compare && from && to) {
        const curFrom = new Date(from)
        const curTo = new Date(to + 'T23:59:59')
        const spanMs = curTo.getTime() - curFrom.getTime()
        const prevTo = new Date(curFrom.getTime() - 1000) // one sec before current from
        const prevFrom = new Date(prevTo.getTime() - spanMs)
        const p2 = new URLSearchParams()
        p2.set('from', prevFrom.toISOString())
        p2.set('to', prevTo.toISOString())
        if (city) p2.set('city', city)
        if (method) p2.set('method', method)
        p2.set('groupBy', groupBy)
        p2.set('format', 'json')
        p2.set('limit', String(limit))
        const res2 = await fetch(`${API}/admin/revenue/report?${p2}`, { headers: { 'Authorization': `Bearer ${token}` }, cache: 'no-store' })
        if (res2.ok) {
          const body2: Resp = await res2.json()
          setPrevItems(Array.isArray(body2.items) ? body2.items : [])
        }
      }

      // Load supplemental groupings for dashboard
      fetchGrouping('day').then(setDayItems).catch(() => setDayItems([]))
      fetchGrouping('city').then(setCityItems).catch(() => setCityItems([]))
      fetchGrouping('method').then(setMethodItems).catch(() => setMethodItems([]))
      fetchTripSummary({ from, to, city }).then(setTripSummary).catch(() => setTripSummary(null))
      fetchAnalyticsGrouping('city', { from, to, city, limit }).then(setAnalyticsCity).catch(() => setAnalyticsCity([]))
      fetchAnalyticsGrouping('day', { from, to, city, limit }).then(setAnalyticsDay).catch(() => setAnalyticsDay([]))
    } catch (e: any) {
      setError(e?.message || 'Error al cargar reporte')
    } finally {
      setLoading(false)
    }
  }

  async function fetchGrouping(group: 'day'|'city'|'method'): Promise<Row[]> {
    const token = getValidToken()
    if (!token) return []
    const p = new URLSearchParams()
    if (from) p.set('from', new Date(from).toISOString())
    if (to) p.set('to', new Date(to + 'T23:59:59').toISOString())
    if (city) p.set('city', city)
    if (method) p.set('method', method)
    p.set('groupBy', group)
    p.set('format', 'json')
    p.set('limit', String(limit))
    const res = await fetch(`${API}/admin/revenue/report?${p}`, { headers: { 'Authorization': `Bearer ${token}` }, cache: 'no-store' })
    if (!res.ok) return []
    const body: Resp = await res.json()
    return Array.isArray(body.items) ? body.items : []
  }

  function applyQuickRange(key: string) {
    const pad = (n: number) => n.toString().padStart(2,'0')
    const toDateStr = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
    const now = new Date()
    let start: Date, end: Date
    if (key === 'today') {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    } else if (key === '7d') {
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      start = new Date(end); start.setDate(end.getDate() - 6)
    } else if (key === '30d') {
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      start = new Date(end); start.setDate(end.getDate() - 29)
    } else if (key === 'this_month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1)
      end = new Date(now.getFullYear(), now.getMonth()+1, 0)
    } else if (key === 'prev_month') {
      const firstPrev = new Date(now.getFullYear(), now.getMonth()-1, 1)
      start = firstPrev
      end = new Date(now.getFullYear(), now.getMonth(), 0)
    } else { return }
    setFrom(toDateStr(start))
    setTo(toDateStr(end))
  }

  function exportCsv() {
    const token = getValidToken()
    if (!token) { location.href = '/login'; return }
    const p = new URLSearchParams()
    if (from) p.set('from', new Date(from).toISOString())
    if (to) p.set('to', new Date(to + 'T23:59:59').toISOString())
    if (city) p.set('city', city)
    if (method) p.set('method', method)
    p.set('groupBy', groupBy)
    p.set('format', 'csv')
    p.set('limit', String(limit))
    fetch(`${API}/admin/revenue/report?${p}`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `revenue_${groupBy}_${new Date().toISOString().slice(0,10)}.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      })
      .catch(() => alert('No se pudo descargar CSV'))
  }

  return (
    <div>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h2>Reportes</h2>
        <div className="row" style={{gap:8}}>
          <button className="btn secondary" onClick={exportCsv}>Export CSV</button>
          <button className="btn" onClick={load} disabled={loading}>{loading ? 'Cargando…' : 'Actualizar'}</button>
        </div>
      </div>
      <Kpis gmv={kpis.gmv} count={kpis.count} avg={kpis.avg} tripSummary={tripSummary || undefined} />
      <div className="card" style={{margin:'10px 0'}}>
        <div className="row" style={{gap:16, flexWrap:'wrap'}}>
          <label>
            <div className="muted">Preset</div>
            <PresetPicker value={{ from, to, city, method, groupBy, limit, compare }} onLoad={(v) => {
              setFrom(v.from || '')
              setTo(v.to || '')
              setCity(v.city || '')
              setMethod(v.method || '')
              setGroupBy((v.groupBy as any) || 'city_method')
              setLimit(Number(v.limit || 1000))
              setCompare(!!v.compare)
            }} />
          </label>
          <label>
            <div className="muted">Guardar preset</div>
            <button className="btn secondary" onClick={() => savePreset({ from, to, city, method, groupBy, limit, compare })}>Guardar</button>
          </label>
          <label>
            <div className="muted">Rango rápido</div>
            <select value={''} onChange={e=>applyQuickRange(e.target.value)}>
              <option value="">Seleccionar…</option>
              <option value="today">Hoy</option>
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="this_month">Este mes</option>
              <option value="prev_month">Mes anterior</option>
            </select>
          </label>
          <label>
            <div className="muted">Desde</div>
            <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
          </label>
          <label>
            <div className="muted">Hasta</div>
            <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
          </label>
          <label>
            <div className="muted">Ciudad</div>
            <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Guayaquil" />
          </label>
          <label>
            <div className="muted">Método</div>
            <input value={method} onChange={e=>setMethod(e.target.value)} placeholder="CARD/CASH" />
          </label>
          <label>
            <div className="muted">Grupo</div>
            <select value={groupBy} onChange={e=>setGroupBy(e.target.value as any)}>
              <option value="city_method">Ciudad + Método</option>
              <option value="city">Ciudad</option>
              <option value="method">Método</option>
              <option value="day">Día</option>
              <option value="city_day">Ciudad + Día</option>
            </select>
          </label>
          <label>
            <div className="muted">Límite</div>
            <input type="number" value={limit} onChange={e=>setLimit(Number(e.target.value))} />
          </label>
          <label className="row" style={{gap:8}}>
            <input type="checkbox" checked={compare} onChange={e=>setCompare(e.target.checked)} disabled={!from || !to} />
            <span className="muted">Comparar vs periodo anterior</span>
          </label>
        </div>
      </div>

      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <Kpis gmv={kpis.gmv} count={kpis.count} avg={kpis.avg} prev={compare ? prevKpis : undefined} tripSummary={tripSummary || undefined} />
        <button className="btn secondary" onClick={() => exportMainChartPng()} aria-label="Exportar gráfico como PNG">Export PNG</button>
      </div>
      <Chart series={series} prevSeries={compare ? prevSeries : undefined} dims={dims} countTotals={countTotals} prevCountTotals={compare ? prevCountTotals : undefined} exportableId="main_chart" />

      <div className="row" style={{gap:12, flexWrap:'wrap', marginTop:12}}>
        <div style={{flex:'1 1 380px', minWidth:320}}>
          <div style={{marginBottom:6}}><strong>Por ciudad</strong></div>
          <Chart series={citySeries} dims={dimsFor('city')} />
        </div>
        <div style={{flex:'1 1 380px', minWidth:320}}>
          <div style={{marginBottom:6}}><strong>Por método</strong></div>
          <Pie series={methodSeries} />
        </div>
      </div>

      <div style={{marginTop:12}}>
        <div style={{marginBottom:6}}><strong>Evolución diaria</strong></div>
        <Chart series={daySeries} dims={dimsFor('day')} />
      </div>

      <div style={{marginTop:12}}>
        <div style={{marginBottom:6}}><strong>Trips por ciudad (Completed vs Canceled)</strong></div>
        <StackedCounts items={analyticsCity} />
      </div>
      <div style={{marginTop:12}}>
        <div style={{marginBottom:6}}><strong>Trips por día (Completed vs Canceled)</strong></div>
        <StackedCounts items={analyticsDay} />
      </div>

      <table className="table" style={{marginTop:12}}>
        <thead>
          <tr>
            {dims.keys.map(k => <th key={k}>{k}</th>)}
            <th>Count</th>
            <th>Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r, i) => (
            <tr key={i}>
              {dims.keys.map(k => <td key={k}>{String(r[k] ?? '')}</td>)}
              <td className="muted">{Number(r.count || 0)}</td>
              <td>${Number(r.amountUsd || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


function applyQuickRange(key: string) {
  const pad = (n: number) => n.toString().padStart(2,'0')
  const toDateStr = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
  const now = new Date()
  let start: Date, end: Date
  if (key === 'today') {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  } else if (key === '7d') {
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    start = new Date(end); start.setDate(end.getDate() - 6)
  } else if (key === '30d') {
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    start = new Date(end); start.setDate(end.getDate() - 29)
  } else if (key === 'this_month') {
    start = new Date(now.getFullYear(), now.getMonth(), 1)
    end = new Date(now.getFullYear(), now.getMonth()+1, 0)
  } else if (key === 'prev_month') {
    const firstPrev = new Date(now.getFullYear(), now.getMonth()-1, 1)
    start = firstPrev
    end = new Date(now.getFullYear(), now.getMonth(), 0)
  } else {
    return
  }
  // Update fields
  // Note: We mutate via DOM events by setting global setters if present (Next.js client only). Simpler: direct state setters are not available here.
}function dimsFor(groupBy: string): { keys: string[], primary: string, secondary?: string } {
  if (groupBy === 'city') return { keys: ['city'], primary: 'city' }
  if (groupBy === 'method') return { keys: ['method'], primary: 'method' }
  if (groupBy === 'day') return { keys: ['day'], primary: 'day' }
  if (groupBy === 'city_method') return { keys: ['city','method'], primary: 'city', secondary: 'method' }
  if (groupBy === 'city_day') return { keys: ['city','day'], primary: 'city', secondary: 'day' }
  return { keys: [], primary: '' }
}

function buildSeries(rows: Row[], dims: { primary: string, secondary?: string }) {
  const map = new Map<string, number>()
  const secSet = new Set<string>()
  for (const r of rows) {
    const p = String(r[dims.primary] ?? '—')
    const s = dims.secondary ? String(r[dims.secondary] ?? '—') : ''
    const key = dims.secondary ? `${p}__${s}` : p
    map.set(key, (map.get(key) || 0) + Number(r.amountUsd || 0))
    if (dims.secondary) secSet.add(s)
  }
  const groups = new Map<string, Record<string, number>>()
  for (const [key, val] of map.entries()) {
    if (dims.secondary) {
      const [p, s] = key.split('__')
      const rec = groups.get(p) || {}
      rec[s] = (rec[s] || 0) + val
      groups.set(p, rec)
    } else {
      groups.set(key, { total: val })
    }
  }
  const labels = Array.from(groups.keys())
  const seriesKeys = dims.secondary ? Array.from(secSet) : ['total']
  const data = labels.map(l => seriesKeys.map(sk => groups.get(l)?.[sk] || 0))
  return { labels, seriesKeys, data }
}

function Chart({ series, prevSeries, dims, countTotals, prevCountTotals, exportableId }: { series: { labels: string[], seriesKeys: string[], data: number[][] }, prevSeries?: { labels: string[], seriesKeys: string[], data: number[][] }, dims: { primary: string, secondary?: string }, countTotals?: { labels: string[], data: number[] }, prevCountTotals?: { labels: string[], data: number[] }, exportableId?: string }) {
  const merged = mergeForChart(series, prevSeries)
  const width = Math.max(640, merged.labels.length * 60)
  const height = 260
  const padding = { top: 20, right: 20, bottom: 60, left: 60 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const max = Math.max(1, ...merged.data.flat())
  const colors = ['#4f46e5','#22c55e','#eab308','#ef4444','#06b6d4','#a855f7']

  const barGroupW = innerW / Math.max(1, merged.labels.length)
  const barW = Math.max(10, (barGroupW - 10) / Math.max(1, merged.seriesKeys.length))

  return (
    <div className="card" style={{overflowX:'auto'}}>
      <svg id={exportableId} width={width} height={height} role="img" aria-label="Revenue chart">
        <g transform={`translate(${padding.left},${padding.top})`}>
          <line x1={0} y1={0} x2={0} y2={innerH} stroke="rgba(255,255,255,0.2)" />
          <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="rgba(255,255,255,0.2)" />
          {merged.labels.map((label, i) => {
            const x0 = i * barGroupW
            return (
              <g key={i} transform={`translate(${x0},0)`}>
                {merged.seriesKeys.map((sk, j) => {
                  const val = merged.data[i][j]
                  const h = (val / max) * (innerH - 10)
                  const x = j * barW + j * 4
                  const y = innerH - h
                  return (
                    <g key={j}>
                      <rect x={x} y={y} width={barW} height={h} fill={colors[j % colors.length]} rx={3} />
                    </g>
                  )
                })}
                <text x={barGroupW/2} y={innerH + 14} textAnchor="middle" fontSize="10" fill="#9aa4b2">{label}</text>
              </g>
            )
          })}
          {/* Count totals as line overlay */}
          {countTotals && countTotals.labels.length > 0 && (
            <>
              {renderCountsPath(countTotals, barGroupW, innerH, max, '#93c5fd')}
              {prevCountTotals && renderCountsPath(prevCountTotals, barGroupW, innerH, max, '#fda4af', 2)}
            </>
          )}
          {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => {
            const val = max * t
            const y = innerH - t * (innerH - 10)
            return (
              <g key={idx}>
                <line x1={0} y1={y} x2={innerW} y2={y} stroke="rgba(255,255,255,0.08)" />
                <text x={-8} y={y} textAnchor="end" alignmentBaseline="middle" fontSize="10" fill="#9aa4b2">${val.toFixed(0)}</text>
              </g>
            )
          })}
        </g>
      </svg>
      <div className="row" style={{gap:10, marginTop:8, flexWrap:'wrap'}}>
        {merged.seriesKeys.map((sk, i) => (
          <div key={i} className="row" style={{gap:6}}>
            <span style={{width:12, height:12, background:colors[i % colors.length], borderRadius:2, display:'inline-block'}}></span>
            <span className="muted">{sk}</span>
          </div>
        ))}
        {countTotals && countTotals.labels.length > 0 && (
          <div className="row" style={{gap:6}}>
            <span style={{width:12, height:2, background:'#93c5fd', display:'inline-block', alignSelf:'center'}}></span>
            <span className="muted">Count</span>
          </div>
        )}
        {prevCountTotals && prevCountTotals.labels.length > 0 && (
          <div className="row" style={{gap:6}}>
            <span style={{width:12, height:2, background:'#fda4af', display:'inline-block', alignSelf:'center'}}></span>
            <span className="muted">Count (prev)</span>
          </div>
        )}
      </div>
    </div>
  )
}

function exportMainChartPng() {
  try {
    const svg = document.getElementById('main_chart') as SVGSVGElement | null
    if (!svg) return
    const serializer = new XMLSerializer()
    const src = serializer.serializeToString(svg)
    const svgBlob = new Blob([src], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = svg.width.baseVal.value
      canvas.height = svg.height.baseVal.value
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#0b0f17'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      const a = document.createElement('a')
      a.download = `revenue_chart_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.png`
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = url
  } catch {}
}

function mergeForChart(cur: { labels: string[], seriesKeys: string[], data: number[][] }, prev?: { labels: string[], seriesKeys: string[], data: number[][] }) {
  if (!prev || prev.seriesKeys.length === 0) return cur
  const labelsSet = new Set<string>([...cur.labels, ...prev.labels])
  const labels = Array.from(labelsSet)
  const keys: string[] = []
  const data: number[][] = labels.map(() => [])

  for (const sk of cur.seriesKeys) {
    keys.push(sk)
  }
  for (const sk of prev.seriesKeys) {
    keys.push(`${sk} (prev)`)
  }

  const curIndex = new Map(cur.labels.map((l, i) => [l, i]))
  const prevIndex = new Map(prev.labels.map((l, i) => [l, i]))

  labels.forEach((label, li) => {
    const ci = curIndex.get(label)
    const pi = prevIndex.get(label)
    // current values
    for (let j = 0; j < cur.seriesKeys.length; j++) {
      data[li][j] = (ci != null ? cur.data[ci][j] : 0)
    }
    // prev values appended after
    for (let j = 0; j < prev.seriesKeys.length; j++) {
      data[li][cur.seriesKeys.length + j] = (pi != null ? prev.data[pi][j] : 0)
    }
  })

  return { labels, seriesKeys: keys, data }
}

function buildCountTotals(rows: Row[], dims: { primary: string, secondary?: string }) {
  const map = new Map<string, number>()
  for (const r of rows) {
    const p = String(r[dims.primary] ?? '—')
    map.set(p, (map.get(p) || 0) + Number(r.count || 0))
  }
  const labels = Array.from(map.keys())
  const data = labels.map(l => map.get(l) || 0)
  return { labels, data }
}

function renderCountsPath(series: { labels: string[], data: number[] }, barGroupW: number, innerH: number, max: number, color: string, dash: number = 0) {
  const points: string[] = []
  for (let i = 0; i < series.labels.length; i++) {
    const x = i * barGroupW + barGroupW / 2
    const val = series.data[i] || 0
    const y = innerH - (max > 0 ? (val / max) * (innerH - 10) : 0)
    points.push(`${x},${y}`)
  }
  return <polyline fill="none" stroke={color} strokeWidth={2} strokeDasharray={dash ? `${dash},${dash}` : undefined} points={points.join(' ')} />
}

function StackedCounts({ items }: { items: Array<{ key: string, total: number, completed: number, canceled: number }> }) {
  const width = Math.max(640, (items?.length || 0) * 60)
  const height = 240
  const padding = { top: 20, right: 20, bottom: 60, left: 60 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const labels = items.map(i => i.key)
  const max = Math.max(1, ...items.map(i => i.total || 0))
  const barGroupW = innerW / Math.max(1, labels.length)
  const colors = { completed: '#22c55e', canceled: '#ef4444' }
  return (
    <div className="card" style={{overflowX:'auto'}}>
      <svg width={width} height={height} role="img" aria-label="Trips counts">
        <g transform={`translate(${padding.left},${padding.top})`}>
          <line x1={0} y1={0} x2={0} y2={innerH} stroke="rgba(255,255,255,0.2)" />
          <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="rgba(255,255,255,0.2)" />
          {items.map((it, i) => {
            const x0 = i * barGroupW
            const compH = (Number(it.completed || 0) / max) * (innerH - 10)
            const cancH = (Number(it.canceled || 0) / max) * (innerH - 10)
            const compY = innerH - compH
            const cancY = compY - cancH
            return (
              <g key={i} transform={`translate(${x0},0)`}>
                <rect x={10} y={cancY} width={barGroupW-20} height={cancH} fill={colors.canceled} rx={3} />
                <rect x={10} y={compY} width={barGroupW-20} height={compH} fill={colors.completed} rx={3} />
                <text x={barGroupW/2} y={innerH + 14} textAnchor="middle" fontSize="10" fill="#9aa4b2">{it.key}</text>
              </g>
            )
          })}
          {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => {
            const val = max * t
            const y = innerH - t * (innerH - 10)
            return (
              <g key={idx}>
                <line x1={0} y1={y} x2={innerW} y2={y} stroke="rgba(255,255,255,0.08)" />
                <text x={-8} y={y} textAnchor="end" alignmentBaseline="middle" fontSize="10" fill="#9aa4b2">{Math.round(val)}</text>
              </g>
            )
          })}
        </g>
      </svg>
      <div className="row" style={{gap:10, marginTop:8, flexWrap:'wrap'}}>
        <div className="row" style={{gap:6}}>
          <span style={{width:12, height:12, background:colors.completed, borderRadius:2, display:'inline-block'}}></span>
          <span className="muted">Completed</span>
        </div>
        <div className="row" style={{gap:6}}>
          <span style={{width:12, height:12, background:colors.canceled, borderRadius:2, display:'inline-block'}}></span>
          <span className="muted">Canceled</span>
        </div>
      </div>
    </div>
  )
}

async function fetchAnalyticsGrouping(group: 'city'|'day', params: { from?: string, to?: string, city?: string, limit: number }) {
  const token = getValidToken()
  if (!token) return []
  const p = new URLSearchParams()
  if (params.from) p.set('from', new Date(params.from).toISOString())
  if (params.to) p.set('to', new Date(params.to + 'T23:59:59').toISOString())
  if (params.city) p.set('city', params.city)
  p.set('groupBy', group)
  p.set('limit', String(params.limit))
  const res = await fetch(`${API}/admin/analytics/trips?${p}`, { headers: { 'Authorization': `Bearer ${token}` }, cache: 'no-store' })
  if (!res.ok) return []
  const body = await res.json()
  return Array.isArray(body.items) ? body.items : []
}

function computeKpis(rows: Row[]) {
  const gmv = rows.reduce((a, r) => a + Number(r.amountUsd || 0), 0)
  const count = rows.reduce((a, r) => a + Number(r.count || 0), 0)
  const avg = count > 0 ? gmv / count : 0
  return { gmv, count, avg }
}

function Kpis({ gmv, count, avg, prev, tripSummary }: { gmv: number, count: number, avg: number, prev?: { gmv: number, count: number, avg: number }, tripSummary?: { total: number, completed: number, canceled: number, completionRate: number, cancelRate: number } }) {
  const fmt = (n: number) => `$${n.toFixed(2)}`
  const delta = (cur: number, prev?: number) => {
    if (prev == null || !isFinite(prev) || prev === 0) return null
    const d = cur - prev
    const pct = prev !== 0 ? (d / prev) * 100 : 0
    const up = d > 0
    const same = d === 0
    const color = same ? '#9aa4b2' : (up ? '#22c55e' : '#ef4444')
    const arrow = same ? '•' : (up ? '▲' : '▼')
    return <span style={{color, marginLeft:6, fontSize:12}}>{arrow} {Math.abs(pct).toFixed(1)}%</span>
  }
  const box = (title: string, value: string, d?: JSX.Element | null) => (
    <div className="card" style={{padding:'12px 16px', flex:'1 1 160px'}}>
      <div className="muted" style={{marginBottom:6}}>{title}</div>
      <div style={{fontSize:22, fontWeight:600, display:'flex', alignItems:'center'}}>{value}{d}</div>
    </div>
  )
  return (
    <div className="row" style={{gap:12, flexWrap:'wrap', marginTop:10}}>
      {box('GMV (USD)', fmt(gmv), delta(gmv, prev?.gmv))}
      {box('Pagos (PAID)', String(count), delta(count, prev?.count))}
      {box('Ticket promedio', fmt(avg), delta(avg, prev?.avg))}
      {tripSummary ? box('Cancel rate', `${(tripSummary.cancelRate*100).toFixed(1)}%`) : null}
      {tripSummary ? box('Completion rate', `${(tripSummary.completionRate*100).toFixed(1)}%`) : null}
    </div>
  )
}

function Pie({ series }: { series: { labels: string[], seriesKeys: string[], data: number[][] } }) {
  const total = series.data.flat().reduce((a, v) => a + v, 0)
  const colors = ['#4f46e5','#22c55e','#eab308','#ef4444','#06b6d4','#a855f7']
  let acc = 0
  const radius = 70
  const cx = 100, cy = 100
  const arcs = series.labels.map((label, i) => {
    const val = series.data[i][0] || 0
    const angle = total > 0 ? (val/total) * Math.PI * 2 : 0
    const start = acc
    const end = acc + angle
    acc = end
    const x1 = cx + radius * Math.cos(start)
    const y1 = cy + radius * Math.sin(start)
    const x2 = cx + radius * Math.cos(end)
    const y2 = cy + radius * Math.sin(end)
    const large = angle > Math.PI ? 1 : 0
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`
    return { d, color: colors[i % colors.length], label, val }
  })
  return (
    <div className="card" style={{display:'flex', gap:12, alignItems:'center'}}>
      <svg width={220} height={220} viewBox={`0 0 ${cx*2} ${cy*2}`}>
        {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} />)}
      </svg>
      <div>
        {series.labels.map((label, i) => (
          <div key={i} className="row" style={{gap:6}}>
            <span style={{width:12, height:12, background:colors[i % colors.length], borderRadius:2, display:'inline-block'}}></span>
            <span className="muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )}

type Preset = { name: string, from?: string, to?: string, city?: string, method?: string, groupBy?: string, limit?: number, compare?: boolean }
const PRESETS_KEY = 'reports_presets'
function readPresets(): Preset[] {
  try { return JSON.parse(localStorage.getItem(PRESETS_KEY) || '[]') } catch { return [] }
}
function writePresets(list: Preset[]) { localStorage.setItem(PRESETS_KEY, JSON.stringify(list)) }
function savePreset(v: Omit<Preset, 'name'>) {
  const name = prompt('Nombre del preset:')?.trim()
  if (!name) return
  const list = readPresets().filter(p => p.name !== name)
  list.push({ name, ...v })
  writePresets(list)
  alert('Preset guardado')
}
function PresetPicker({ value, onLoad }: { value: any, onLoad: (v: Preset) => void }) {
  const [list, setList] = useState<Preset[]>([])
  useEffect(() => { setList(readPresets()) }, [])
  const [sel, setSel] = useState<string>('')
  return (
    <div className="row" style={{gap:8}}>
      <select value={sel} onChange={e=>setSel(e.target.value)}>
        <option value="">Seleccionar…</option>
        {list.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
      </select>
      <button className="btn secondary" onClick={() => { const p = list.find(x => x.name === sel); if (p) onLoad(p) }}>Cargar</button>
      <button className="btn secondary" onClick={() => { if (!sel) return; const next = list.filter(x => x.name !== sel); writePresets(next); setList(next); setSel('') }}>Eliminar</button>
    </div>
  )
}

async function fetchTripSummary(params: { from?: string, to?: string, city?: string }): Promise<{ total: number, completed: number, canceled: number, completionRate: number, cancelRate: number }> {
  const token = getValidToken()
  if (!token) return { total: 0, completed: 0, canceled: 0, completionRate: 0, cancelRate: 0 }
  const p = new URLSearchParams()
  if (params.from) p.set('from', new Date(params.from).toISOString())
  if (params.to) p.set('to', new Date(params.to + 'T23:59:59').toISOString())
  if (params.city) p.set('city', params.city)
  const res = await fetch(`${API}/admin/analytics/trips?${p}`, { headers: { 'Authorization': `Bearer ${token}` }, cache: 'no-store' })
  if (!res.ok) return { total: 0, completed: 0, canceled: 0, completionRate: 0, cancelRate: 0 }
  return res.json()
}

