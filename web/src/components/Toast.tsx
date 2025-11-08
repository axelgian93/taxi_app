'use client'
import React, { createContext, useContext, useMemo, useState } from 'react'

type Toast = { id: number, kind?: 'success'|'error'|'info', text: string, ttl?: number }
type Ctx = { show: (text: string, kind?: Toast['kind'], ttlMs?: number) => void }

const ToastCtx = createContext<Ctx | null>(null)

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const show = (text: string, kind: Toast['kind'] = 'info', ttlMs = 3200) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    const t: Toast = { id, kind, text, ttl: Date.now() + ttlMs }
    setToasts(prev => [...prev, t])
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), ttlMs)
  }
  const ctx = useMemo(() => ({ show }), [])
  return (
    <ToastCtx.Provider value={ctx}>
      {children}
      <div style={{position:'fixed', top:12, right:12, display:'flex', flexDirection:'column', gap:8, zIndex:1000}}>
        {toasts.map(t => (
          <div key={t.id} className="card" style={{
            padding:'10px 12px', minWidth:260, maxWidth:360,
            borderLeft: `4px solid ${t.kind==='success'?'#22c55e':t.kind==='error'?'#ef4444':'#3b82f6'}`
          }}>
            <div style={{fontWeight:600, marginBottom:2}}>{t.kind==='success'?'Éxito':t.kind==='error'?'Error':'Info'}</div>
            <div className="muted">{t.text}</div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

