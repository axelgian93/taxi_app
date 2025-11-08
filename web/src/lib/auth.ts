export type User = {
  id: string
  email: string
  role: 'ADMIN' | 'DRIVER' | 'RIDER'
}

const TOKEN_KEY = 'taxi_token'
const USER_KEY = 'taxi_user'

export function saveAuth(token: string, user: User) {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try { return JSON.parse(raw) as User } catch { return null }
}

export function clearAuth() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

type JwtPayload = { exp?: number, iat?: number, [k: string]: any }

function base64UrlDecode(input: string): string {
  try {
    // Replace URL-safe chars and add padding
    const pad = input.length % 4 === 2 ? '==' : input.length % 4 === 3 ? '=' : input.length % 4 === 1 ? '===' : ''
    const s = input.replace(/-/g, '+').replace(/_/g, '/') + pad
    if (typeof atob === 'function') return atob(s)
    // Node fallback
    return Buffer.from(s, 'base64').toString('binary')
  } catch {
    return ''
  }
}

export function decodeJwt(token: string): JwtPayload | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const payload = base64UrlDecode(parts[1])
    return JSON.parse(payload)
  } catch {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt(token)
  if (!payload?.exp) return false
  const nowSec = Math.floor(Date.now() / 1000)
  return nowSec >= payload.exp
}

export function getValidToken(): string | null {
  const t = getToken()
  if (!t) return null
  if (isTokenExpired(t)) {
    clearAuth()
    return null
  }
  return t
}

