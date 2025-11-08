'use client'
import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'

export default function VersionTag() {
  const [version, setVersion] = useState<string>('')
  const [env, setEnv] = useState<string>('')
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`${API}/healthz/extended`, { cache: 'no-store' })
        if (!res.ok) return
        const body = await res.json()
        if (!cancelled) {
          setVersion(body?.version || '')
          setEnv((body?.env || '').toString())
        }
      } catch {}
    })()
    return () => { cancelled = true }
  }, [])
  if (!version) return null
  const envTag = env ? ` ${env.toLowerCase()}` : ''
  return <span className="muted" style={{marginLeft: 12}}>v{version}{envTag ? ` (${envTag})` : ''}</span>
}
