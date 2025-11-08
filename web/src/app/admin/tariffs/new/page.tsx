'use client'
import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { apiFetch } from '@/src/lib/api'
import { getValidToken, getUser } from '@/src/lib/auth'

export default function NewTariffPage() {
  const [form, setForm] = useState<any>({
    city: '', active: true,
    baseFareUsd: 1.5, perKmUsd: 0.5, perMinUsd: 0.15, minFareUsd: 2,
    nightMultiplier: 1, weekendMultiplier: 1, surgeMultiplier: 1,
    nightStartHour: '', nightEndHour: '',
    cancellationGraceSec: 120, cancellationFeeAcceptedUsd: 1, cancellationFeeArrivedUsd: 2,
    notes: '', deactivateOld: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const user = getUser()
    if (!user || user.role !== 'ADMIN') { location.href = '/login'; return }
    const token = getValidToken()
    if (!token) { location.href = '/login'; return }
    setLoading(true)
    try {
      const payload: any = {
        city: form.city.trim(),
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
        deactivateOld: !!form.deactivateOld,
      }
      await apiFetch('/admin/tariffs', { method: 'POST', body: JSON.stringify(payload) }, token)
      location.href = '/admin/tariffs'
    } catch (e: any) {
      setError(e?.message || 'Error al crear')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h2>Nueva Tarifa</h2>
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
          <Field label="Mínimo $"><input type="number" step="0.01" value={form.minFareUsd} onChange={e=>setForm({...form, minFareUsd:e.target.value})} /></Field>
        </Row>
        <Row>
          <Field label="Mult. noche"><input type="number" step="0.01" value={form.nightMultiplier} onChange={e=>setForm({...form, nightMultiplier:e.target.value})} /></Field>
          <Field label="Mult. fin de semana"><input type="number" step="0.01" value={form.weekendMultiplier} onChange={e=>setForm({...form, weekendMultiplier:e.target.value})} /></Field>
          <Field label="Surge"><input type="number" step="0.01" value={form.surgeMultiplier} onChange={e=>setForm({...form, surgeMultiplier:e.target.value})} /></Field>
        </Row>
        <Row>
          <Field label="Hora inicio noche"><input type="number" min="0" max="23" value={form.nightStartHour} onChange={e=>setForm({...form, nightStartHour:e.target.value})} /></Field>
          <Field label="Hora fin noche"><input type="number" min="0" max="23" value={form.nightEndHour} onChange={e=>setForm({...form, nightEndHour:e.target.value})} /></Field>
          <Field label="Gracia cancelación (s)"><input type="number" min="0" value={form.cancellationGraceSec} onChange={e=>setForm({...form, cancellationGraceSec:e.target.value})} /></Field>
        </Row>
        <Row>
          <Field label="Fee cancelación ACCEPTED $"><input type="number" step="0.01" value={form.cancellationFeeAcceptedUsd} onChange={e=>setForm({...form, cancellationFeeAcceptedUsd:e.target.value})} /></Field>
          <Field label="Fee cancelación ARRIVED $"><input type="number" step="0.01" value={form.cancellationFeeArrivedUsd} onChange={e=>setForm({...form, cancellationFeeArrivedUsd:e.target.value})} /></Field>
          <Field label="Desactivar previas"><input type="checkbox" checked={form.deactivateOld} onChange={e=>setForm({...form, deactivateOld:e.target.checked})} /></Field>
        </Row>
        <Field label="Notas"><input value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} /></Field>
        {error && <div style={{color:'var(--danger)'}}>{error}</div>}
        <div className="row" style={{justifyContent:'flex-end'}}>
          <button className="btn" disabled={loading}>{loading ? 'Guardando…' : 'Crear'}</button>
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

