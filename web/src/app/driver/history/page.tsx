'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { apiFetch } from '@/src/lib/api'
import { getUser, getValidToken } from '@/src/lib/auth'

type Item = {
  id: string
  status: 'COMPLETED'|'CANCELED'
  pickupLat: number
  pickupLng: number
  dropoffLat: number
  dropoffLng: number
  requestedAt: string
  completedAt?: string | null
  costUsd?: number | null
  currency?: string | null
}

export default function DriverHistoryPage() {
  const [items, setItems] = useState<Item[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { refresh(null) }, [])

  async function refresh(cur: string | null) {
    setLoading(true); setError(null)
    const u = getUser(); if (!u) { location.replace('/login'); return }
    if (u.role !== 'DRIVER') { setError('Acceso solo para DRIVER'); setLoading(false); return }
    try {
      const token = getValidToken(); if (!token) { location.replace('/login'); return }
      const q = new URLSearchParams(); if (cur) q.set('cursor', cur)
      const resp = await apiFetch<{ items: Item[], nextCursor?: string|null }>(`/drivers/my-trips/history?${q.toString()}`, {}, token)
      setItems(resp.items || [])
      setNextCursor(resp.nextCursor || null)
      setCursor(cur)
    } catch (e: any) { setError(e?.message || 'Error') } finally { setLoading(false) }
  }

  return (
    <div>
      <h2>Historial de Viajes</h2>
      {error && <div style={{color:'var(--danger)'}}>{error}</div>}
      {loading ? (
        <div className="muted">Cargando…</div>
      ) : items.length === 0 ? (
        <div className="muted">Sin resultados</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Estado</th>
                <th>Solicitado</th>
                <th>Completado</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id}>
                  <td>{it.id}</td>
                  <td>{it.status}</td>
                  <td>{new Date(it.requestedAt).toLocaleString()}</td>
                  <td>{it.completedAt ? new Date(it.completedAt).toLocaleString() : '-'}</td>
                  <td>{it.costUsd != null ? `$${Number(it.costUsd).toFixed(2)} ${it.currency || 'USD'}` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="row" style={{gap:8, marginTop:10}}>
        <button className="btn secondary" onClick={() => refresh(nextCursor)} disabled={!nextCursor || loading}>Siguiente</button>
        <button className="btn secondary" onClick={() => refresh(null)} disabled={loading}>Volver al inicio</button>
        <Link className="btn" href="/driver">Volver</Link>
      </div>
    </div>
  )
}

