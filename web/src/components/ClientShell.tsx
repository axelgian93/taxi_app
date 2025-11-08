"use client"
import React from 'react'
import Link from 'next/link'
import DemoBanner from '@/src/components/DemoBanner'
import VersionTag from '@/src/components/VersionTag'
import { ToastProvider } from '@/src/components/Toast'
import { getUser, clearAuth } from '@/src/lib/auth'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />
      <header className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div className="row">
          <strong>Taxi App</strong>
          <nav className="row" style={{gap:16}}>
            <Link href="/">Inicio</Link>
            <Link href="/admin/trips">Trips</Link>
            <Link href="/admin/tariffs">Tarifas</Link>
            <Link href="/admin/simulator">Simulador</Link>
            <Link href="/admin/reports">Reportes</Link>
            <Link href="/admin/ops">Operaciones</Link>
          </nav>
        </div>
        <UserNav />
      </header>
      <ToastProvider>
        <main className="container">{children}</main>
      </ToastProvider>
      <footer className="container" style={{marginTop:24, paddingBottom:24, display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
        <Link href="/admin/readme">Guía de Demo</Link>
        <VersionTag />
      </footer>
    </>
  )
}

function UserNav() {
  const [user, setUser] = React.useState(() => getUser())
  React.useEffect(() => {
    const i = setInterval(() => setUser(getUser()), 1000)
    return () => clearInterval(i)
  }, [])
  if (!user) return <Link className="btn secondary" href="/login">Ingresar</Link>
  return (
    <div className="row">
      <span className="muted">{user.email} ({user.role})</span>
      <button className="btn secondary" onClick={() => { clearAuth(); location.href = '/login' }}>Salir</button>
    </div>
  )
}

