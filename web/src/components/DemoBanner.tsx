'use client'
import { useEffect, useState } from 'react'
import { getValidToken } from '@/src/lib/auth'

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'
const KEY = 'demo_mode'

export default function DemoBanner() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(KEY) === '1'
  })
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const onUnload = () => {
      const token = getValidToken()
      if (!token) return
      try {
        // Try keepalive fetch to reset demo
        fetch(`${API}/admin/demo/reset`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          keepalive: true,
          cache: 'no-store'
        }).catch(()=>{})
      } catch {}
    }
    window.addEventListener('beforeunload', onUnload)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') onUnload()
    })
    return () => window.removeEventListener('beforeunload', onUnload)
  }, [enabled])

  async function seed() {
    setBusy(true); setMsg(null)
    try {
      const token = getValidToken(); if (!token) throw new Error('Inicia sesión')
      const res = await fetch(`${API}/admin/demo/seed`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
      if (!res.ok) throw new Error(`Seed HTTP ${res.status}`)
      setMsg('Demo iniciada')
    } catch (e: any) { setMsg(e?.message || 'Error en seed') } finally { setBusy(false) }
  }

  async function reset() {
    setBusy(true); setMsg(null)
    try {
      const token = getValidToken(); if (!token) throw new Error('Inicia sesión')
      const res = await fetch(`${API}/admin/demo/reset`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
      if (!res.ok) throw new Error(`Reset HTTP ${res.status}`)
      setMsg('Demo reseteada')
    } catch (e: any) { setMsg(e?.message || 'Error en reset') } finally { setBusy(false) }
  }

  async function toggle() {
    const next = !enabled
    setEnabled(next)
    if (typeof window !== 'undefined') localStorage.setItem(KEY, next ? '1' : '0')
    if (next) await seed()
    else await reset()
  }

  return (
    <div style={{background: enabled ? '#0b4' : '#444', color:'white', padding:'6px 12px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <div className="row" style={{gap:12, alignItems:'center'}}>
        <strong>Modo Demo</strong>
        <span className="muted">{enabled ? 'activo' : 'inactivo'}</span>
        {msg && <span style={{opacity:0.8}}>{msg}</span>}
      </div>
      <div className="row" style={{gap:8}}>
        <button className="btn secondary" onClick={toggle} disabled={busy}>{enabled ? 'Detener' : 'Iniciar'}</button>
        {enabled && <button className="btn secondary" onClick={reset} disabled={busy}>Reset ahora</button>}
      </div>
    </div>
  )
}

