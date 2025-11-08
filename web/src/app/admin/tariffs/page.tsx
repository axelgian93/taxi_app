'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { apiFetch } from '@/src/lib/api'
import { getUser, getValidToken } from '@/src/lib/auth'
import { SkeletonBlock, SkeletonLines } from '@/src/components/Skeleton'

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
  nightStartHour?: number | null
  nightEndHour?: number | null
  notes?: string | null
  updatedAt: string
}

type ListResp = { items: TariffRule[] }

export default function TariffsPage() {
  const [items, setItems] = useState<TariffRule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [city, setCity] = useState('')
  const [active, setActive] = useState<'all'|'true'|'false'>('all')

  const query = useMemo(() => {
    const p = new URLSearchParams()
    if (city) p.set('city', city)
    if (active !== 'all') p.set('active', active === 'true' ? 'true' : 'false')
    return p.toString()
  }, [city, active])

  useEffect(() => {
    const user = getUser()
    if (!user) { location.replace('/login'); return }
    if (user.role !== 'ADMIN') { setError('Acceso solo para ADMIN'); setLoading(false); return }
    const token = getValidToken()
    if (!token) { location.replace('/login'); return }
    setLoading(true)
    apiFetch<ListResp>(`/admin/tariffs${query ? `?${query}` : ''}`, {}, token)
      .then(r => setItems(r.items || []))
      .catch(e => setError(e?.message || 'Error al cargar tarifas'))
      .finally(() => setLoading(false))
  }, [query])

  return (
    <div>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h2>Tarifas</h2>
        <div className="row" style={{gap:8}}>
          <button className="btn secondary" onClick={downloadAuditCsv}>Auditoría CSV</button>
          <Link href="/admin/tariffs/new" className="btn">Nueva regla</Link>
        </div>
      </div>
      <div className="card" style={{margin:'12px 0'}}>
        <div className="row" style={{gap:16, flexWrap:'wrap'}}>
          <label>
            <div className="muted">Ciudad</div>
            <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Guayaquil" style={{padding:6, borderRadius:8}} />
          </label>
          <label>
            <div className="muted">Activa</div>
            <select value={active} onChange={e=>setActive(e.target.value as any)}>
              <option value="all">Todas</option>
              <option value="true">Solo activas</option>
              <option value="false">Solo inactivas</option>
            </select>
          </label>
        </div>
      </div>
      {loading ? (
        <div>
          <div className="table-wrap">
            <SkeletonBlock height={220} />
          </div>
        </div>
      ) : error ? <div style={{color:'var(--danger)'}}>{error}</div> : (
        <table className="table">
          <thead>
            <tr>
              <th>Ciudad</th>
              <th>Activa</th>
              <th>Base</th>
              <th>$/km</th>
              <th>$/min</th>
              <th>Mínimo</th>
              <th>Multipliers</th>
              <th>Actualizada</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(r => (
              <tr key={r.id}>
                <td>{r.city}</td>
                <td>{r.active ? 'Sí' : 'No'}</td>
                <td>${r.baseFareUsd.toFixed(2)}</td>
                <td>${r.perKmUsd.toFixed(2)}</td>
                <td>${r.perMinUsd.toFixed(2)}</td>
                <td>${Number(r.minFareUsd ?? 0).toFixed(2)}</td>
                <td className="muted">N:{r.nightMultiplier ?? 1} · W:{r.weekendMultiplier ?? 1} · S:{r.surgeMultiplier ?? 1}</td>
                <td className="muted">{new Date(r.updatedAt).toLocaleString()}</td>
                <td><Link className="btn secondary" href={`/admin/tariffs/${r.id}`}>Editar</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

async function downloadAuditCsv() {
  try {
    const token = getValidToken()
    if (!token) { location.href = '/login'; return }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'}/admin/audit/tariffs?format=csv`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tariffs_audit_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (e) {
    alert('No se pudo descargar CSV de auditoría')
  }
}
