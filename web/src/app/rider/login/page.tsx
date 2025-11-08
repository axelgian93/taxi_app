'use client'
import { useState } from 'react'
import { apiFetch } from '@/src/lib/api'
import { saveAuth } from '@/src/lib/auth'
import Link from 'next/link'

export default function RiderLogin() {
  const [email, setEmail] = useState('rider@taxi.local')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  async function onSubmit(e: any) {
    e.preventDefault(); setLoading(true); setError(null)
    try {
      const resp = await apiFetch<{ token: string, user: any }>(`/auth/login`, { method: 'POST', body: JSON.stringify({ email, password }) })
      saveAuth(resp.token, resp.user)
      location.href = '/rider/request'
    } catch (e: any) { setError(e?.message || 'Error') } finally { setLoading(false) }
  }
  return (
    <div className="card" style={{maxWidth:420, margin:'40px auto'}}>
      <h2>Rider — Ingresar</h2>
      <form onSubmit={onSubmit} className="row" style={{flexDirection:'column', gap:12}}>
        <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div style={{color:'var(--danger)'}}>{error}</div>}
        <button className="btn" disabled={loading}>{loading?'Ingresando…':'Ingresar'}</button>
      </form>
      <div style={{marginTop:8}} className="muted">¿No tienes cuenta? <Link href="/rider/register">Crear cuenta</Link></div>
    </div>
  )
}

