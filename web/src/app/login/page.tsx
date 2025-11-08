'use client'
import { FormEvent, useState } from 'react'
import { apiFetch } from '@/src/lib/api'
import { saveAuth } from '@/src/lib/auth'

type LoginResp = { token: string, user: { id: string, email: string, role: 'ADMIN'|'DRIVER'|'RIDER' } }

export default function LoginPage() {
  const [email, setEmail] = useState('admin@taxi.local')
  const [password, setPassword] = useState('123456')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const resp = await apiFetch<LoginResp>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      saveAuth(resp.token, resp.user)
      const role = resp.user.role
      if (role === 'ADMIN') location.href = '/admin/trips'
      else if (role === 'DRIVER') location.href = '/driver'
      else location.href = '/rider/trips'
    } catch (err: any) {
      setError(err?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{maxWidth:420, margin:'40px auto'}}>
      <h2>Ingresar</h2>
      <p className="muted">Usa un usuario ADMIN para ver el panel.</p>
      <form onSubmit={onSubmit} className="row" style={{flexDirection:'column', alignItems:'stretch', gap:12}}>
        <label>
          <div className="muted">Email</div>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" style={{width:'100%', padding:8, borderRadius:8}} />
        </label>
        <label>
          <div className="muted">Password</div>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="password" style={{width:'100%', padding:8, borderRadius:8}} />
        </label>
        {error && <div style={{color:'var(--danger)'}}>{error}</div>}
        <button className="btn" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar'}</button>
      </form>
    </div>
  )
}
