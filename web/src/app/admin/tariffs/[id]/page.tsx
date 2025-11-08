'use client'
import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { apiFetch } from '@/src/lib/api'
import { getValidToken, getUser } from '@/src/lib/auth'
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
  cancellationGraceSec?: number | null
  cancellationFeeAcceptedUsd?: number | null
  cancellationFeeArrivedUsd?: number | null
  notes?: string | null
}

export default function EditTariffPage({ params }: { params: { id: string } }) {
  const id = params.id
  const [form, setForm] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const user = getUser()
    if (!user) { location.replace('/login'); return }
    if (user.role !== 'ADMIN') { setError('Acceso solo para ADMIN'); setLoading(false); return }
    const token = getValidToken()
    if (!token) { location.replace('/login'); return }
    setLoading(true)
    // no endpoint GET by id; list and pick
    apiFetch<{ items: TariffRule[] }>(`/admin/tariffs`, {}, token)
      .then(r => {
        const found = (r.items || []).find(x => x.id === id)
        if (!found) throw new Error('No encontrada')
        setForm({ ...found })
      })
      .catch(e => setError(e?.message || 'Error al cargar'))
      .finally(() => setLoading(false))
  }, [id])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const token = getValidToken()
    if (!token) { location.href = '/login'; return }
    setSaving(true)
    try {
      const payload: any = {
        city: form.city,
        active: !!form.active,
        baseFareUsd: Number(form.baseFareUsd),
        perKmUsd: Number(form.perKmUsd),
        perMinUsd: Number(form.perMinUsd),
        minFareUsd: Number(form.minFareUsd || 0),
        nightMultiplier: Number(form.nightMultiplier || 1),
        weekendMultiplier: Number(form.weekendMultiplier || 1),
        surgeMultiplier: Number(form.surgeMultiplier || 1),
        nightStartHour: form.nightStartHour === '' ? null : Number(form.nightStartHour),
        nightEndHour: form.nightEndHour === '' ? null : Number(form.nightEndHour),
        cancellationGraceSec: form.cancellationGraceSec === '' ? null : Number(form.cancellationGraceSec),
        cancellationFeeAcceptedUsd: form.cancellationFeeAcceptedUsd === '' ? null : Number(form.cancellationFeeAcceptedUsd),
        cancellationFeeArrivedUsd: form.cancellationFeeArrivedUsd === '' ? null : Number(form.cancellationFeeArrivedUsd),
        notes: form.notes?.trim() || null,
      }
      await apiFetch(`/admin/tariffs/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(payload) }, token)
      location.href = '/admin/tariffs'
    } catch (e: any) {
      setError(e?.message || 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="card" style={{padding:12}}>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <SkeletonBlock height={24} width={200} />
        <SkeletonBlock height={32} width={120} />
      </div>
      <div style={{marginTop:10}}>
        <SkeletonLines lines={3} />
      </div>
    </div>
  )
  if (error) return <div style={{color:'var(--danger)'}}>{error}</div>
  if (!form) return <div>No encontrada</div>

  return (
    <div>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h2>Editar Tarifa</h2>
        <Link className="btn secondary" href="/admin/tariffs">Volver</Link>
      </div>
      <form onSubmit={onSubmit} className="card" style={{display:'grid', gap:12, maxWidth:820}}>
        <Row>
          <Field label="Ciudad"><input value={form.city} onChange={e=>setForm({...form, city:e.target.value})} required /></Field>
          <Field label="Activa"><input type="checkbox" checked={form.active} onChange={e=>setForm({...form, active:e.target.checked})} /></Field>
        </Row>
        <Row>
          <Field label="Base $"><input type="number" step="0.01" value={form.baseFareUsd} onChange={e=>setForm({...form, baseFareUsd:e.target.value})} required /></Field>
          <Field label="$ por km"><input type="number" step="0.01" value={form.perKmUsd} onChange={e=>setForm({...form, perKmUsd:e.target.value})} required /></Field>
          <Field label="$ por min"><input type="number" step="0.01" value={form.perMinUsd} onChange={e=>setForm({...form, perMinUsd:e.target.value})} required /></Field>
          <Field label="Mínimo $"><input type="number" step="0.01" value={form.minFareUsd ?? ''} onChange={e=>setForm({...form, minFareUsd:e.target.value})} /></Field>
        </Row>
        <Row>
          <Field label="Mult. noche"><input type="number" step="0.01" value={form.nightMultiplier ?? ''} onChange={e=>setForm({...form, nightMultiplier:e.target.value})} /></Field>
          <Field label="Mult. fin de semana"><input type="number" step="0.01" value={form.weekendMultiplier ?? ''} onChange={e=>setForm({...form, weekendMultiplier:e.target.value})} /></Field>
          <Field label="Surge"><input type="number" step="0.01" value={form.surgeMultiplier ?? ''} onChange={e=>setForm({...form, surgeMultiplier:e.target.value})} /></Field>
        </Row>
        <Row>
          <Field label="Hora inicio noche"><input type="number" min="0" max="23" value={form.nightStartHour ?? ''} onChange={e=>setForm({...form, nightStartHour:e.target.value})} /></Field>
          <Field label="Hora fin noche"><input type="number" min="0" max="23" value={form.nightEndHour ?? ''} onChange={e=>setForm({...form, nightEndHour:e.target.value})} /></Field>
          <Field label="Gracia cancelación (s)"><input type="number" min="0" value={form.cancellationGraceSec ?? ''} onChange={e=>setForm({...form, cancellationGraceSec:e.target.value})} /></Field>
        </Row>
        <Row>
          <Field label="Fee cancelación ACCEPTED $"><input type="number" step="0.01" value={form.cancellationFeeAcceptedUsd ?? ''} onChange={e=>setForm({...form, cancellationFeeAcceptedUsd:e.target.value})} /></Field>
          <Field label="Fee cancelación ARRIVED $"><input type="number" step="0.01" value={form.cancellationFeeArrivedUsd ?? ''} onChange={e=>setForm({...form, cancellationFeeArrivedUsd:e.target.value})} /></Field>
        </Row>
        <Field label="Notas"><input value={form.notes ?? ''} onChange={e=>setForm({...form, notes:e.target.value})} /></Field>
        {error && <div style={{color:'var(--danger)'}}>{error}</div>}
        <div className="row" style={{justifyContent:'flex-end'}}>
          <button className="btn" disabled={saving}>{saving ? 'Guardando…' : 'Guardar'}</button>
        </div>
      </form>
    </div>
  )
}

function Row({ children }: any) { return <div className="row" style={{gap:16, flexWrap:'wrap'}}>{children}</div> }
function Field({ label, children }: any) {
  return (
    <label style={{display:'grid'}}>
      <div className="muted">{label}</div>
      {children}
    </label>
  )
}
