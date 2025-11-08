'use client'
import { useEffect } from 'react'
import { getValidToken, getUser } from '@/src/lib/auth'

export default function Home() {
  useEffect(() => {
    if (getValidToken()) {
      const u = getUser()
      if (u?.role === 'DRIVER') location.replace('/driver')
      else if (u?.role === 'RIDER') location.replace('/rider/trips')
      else location.replace('/admin/trips')
    } else {
      location.replace('/login')
    }
  }, [])
  return null
}
