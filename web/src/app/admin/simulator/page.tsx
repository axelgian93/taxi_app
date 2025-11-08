'use client'
import { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '@/src/lib/api'
import { getValidToken, getUser } from '@/src/lib/auth'

type TariffRule = {
  id: string
  city: string
  active: boolean
  baseFareUsd: number
  perKmUsd: number
  perMinUsd: number
  minFareUsd?: number
  nightMultiplier?: number
  weekendMultiplier?: number
  surgeMultiplier?: number
}

type ListResp = { items: TariffRule[] }

export default function SimulatorPage() {
  const [city, setCity] = useState('Guayaquil')
  const [distanceKm, setDistanceKm] = useState(5)
  const [durationMin, setDurationMin] = useState(15)
  const [night, setNight] = useState(false)
  const [weekend, setWeekend] = useState(false)
  const [surge, setSurge] = useState(1)
  const [rules, setRules] = useState<TariffRule[]>([])
  const [selId, setSelId] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const user = getUser()
    if (!user) { location.replace('/login'); return }
    if (user.role !== 'ADMIN') { setError('Acceso solo para ADMIN'); return }
    const token = getValidToken()
    if (!token) { location.replace('/login'); return }
    const p = new URLSearchParams()
    p.set('city', city)
    p.set('active', 'true')
    apiFetch<ListResp>(`/admin/tariffs?${p}`, {}, token)
      .then(r => {
        const items = r.items || []
        setRules(items)
        if (items.length && !selId) setSelId(items[0].id)
      })
      .catch(e => setError(e?.message || 'Error al cargar reglas'))
  }, [city])

  const selected = useMemo(() => rules.find(r => r.id === selId) || null, [rules, selId])

  const estimate = useMemo(() => {
    if (!selected) return null
    const base = Number(selected.baseFareUsd || 0)
    const v = base + Number(selected.perKmUsd || 0) * Number(distanceKm || 0) + Number(selected.perMinUsd || 0) * Number(durationMin || 0)
    const mult = (night ? Number(selected.nightMultiplier || 1) : 1) * (weekend ? Number(selected.weekendMultiplier || 1) : 1) * Number(surge || 1)
    const beforeMin = v * mult
    const minFare = Number(selected.minFareUsd || 0)
    const total = Math.max(minFare, beforeMin)
    return { base, beforeMin, minFare, total, mult }
  }, [selected, distanceKm, durationMin, night, weekend, surge])

  return (
    <div>
      <h2>Simulador de Tarifa</h2>
      <div className="card" style={{display:'grid', gap:12, maxWidth:820}}>
        <div className="row" style={{gap:16, flexWrap:'wrap'}}>
          <label>
            <div className="muted">Ciudad</div>
            <input value={city} onChange={e=>setCity(e.target.value)} />
          </label>
          <label>
            <div className="muted">Regla</div>
            <select value={selId} onChange={e=>setSelId(e.target.value)}>
              {rules.map(r => <option key={r.id} value={r.id}>{r.city} • base ${r.baseFareUsd}/km ${r.perKmUsd}/min ${r.perMinUsd}</option>)}
            </select>
          </label>
        </div>
        <div className="row" style={{gap:16, flexWrap:'wrap'}}>
          <label>
            <div className="muted">Distancia (km)</div>
            <input type="number" step="0.1" value={distanceKm} onChange={e=>setDistanceKm(Number(e.target.value))} />
          </label>
          <label>
            <div className="muted">Duración (min)</div>
            <input type="number" step="1" value={durationMin} onChange={e=>setDurationMin(Number(e.target.value))} />
          </label>
          <label className="row" style={{gap:8}}>
            <input type="checkbox" checked={night} onChange={e=>setNight(e.target.checked)} /> Noche
          </label>
          <label className="row" style={{gap:8}}>
            <input type="checkbox" checked={weekend} onChange={e=>setWeekend(e.target.checked)} /> Fin de semana
          </label>
          <label>
            <div className="muted">Surge</div>
            <input type="number" step="0.1" value={surge} onChange={e=>setSurge(Number(e.target.value))} />
          </label>
        </div>
        {error && <div style={{color:'var(--danger)'}}>{error}</div>}
        {estimate && (
          <div className="card">
            <div>Total estimado: <strong>${estimate.total.toFixed(2)}</strong></div>
            <div className="muted">(base + km + min) × mult = ${estimate.beforeMin.toFixed(2)}; mínimo ${estimate.minFare.toFixed(2)}</div>
          </div>
        )}
      </div>
    </div>
  )
}

