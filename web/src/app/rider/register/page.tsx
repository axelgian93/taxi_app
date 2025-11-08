'use client'
import { useState } from 'react'
import { apiFetch } from '@/src/lib/api'
import { saveAuth } from '@/src/lib/auth'
import Link from 'next/link'

export default function RiderRegister() {
  const [email, setEmail] = useState('cliente@demo.local')
  const [password, setPassword] = useState('123456')
  const [firstName, setFirstName] = useState('Cliente')
  const [lastName, setLastName] = useState('Demo')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  async function onSubmit(e: any) {
    e.preventDefault(); setLoading(true); setError(null)
    try {
      const resp = await apiFetch<{ token: string, user: any }>(`/auth/register`, { method: 'POST', body: JSON.stringify({ email, password, firstName, lastName, role: 'RIDER' }) })
      saveAuth(resp.token, resp.user)
      location.href = '/rider/request'
    } catch (e: any) { setError(e?.message || 'Error') } finally { setLoading(false) }
  }
  return (
    <div className="card" style={{maxWidth:480, margin:'40px auto'}}>
      <h2>Rider — Registro</h2>
      <form onSubmit={onSubmit} className="row" style={{flexDirection:'column', gap:12}}>
        <div className="row" style={{gap:8}}>
          <input placeholder="Nombre" value={firstName} onChange={e=>setFirstName(e.target.value)} />
          <input placeholder="Apellido" value={lastName} onChange={e=>setLastName(e.target.value)} />
        </div>
        <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div style={{color:'var(--danger)'}}>{error}</div>}
        <button className="btn" disabled={loading}>{loading?'Creando…':'Crear cuenta'}</button>
      </form>
      <div style={{marginTop:8}} className="muted">¿Ya tienes cuenta? <Link href="/rider/login">Ingresar</Link></div>
    </div>
  )
}

