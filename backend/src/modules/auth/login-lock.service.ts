// src/modules/auth/login-lock.service.ts

type FailState = { fails: number; winResetAt: number; lockedUntil: number; lockCount: number }

const FAIL_MAX = Number(process.env.RL_LOGIN_FAIL_MAX || 5)
const FAIL_WIN_MS = Number(process.env.RL_LOGIN_FAIL_WIN_SEC || 600) * 1000 // 10 min default
const LOCK_BASE_SEC = Number(process.env.RL_LOGIN_LOCK_SEC || 300) // 5 min
const LOCK_MAX_SEC = Number(process.env.RL_LOGIN_LOCK_MAX_SEC || 3600) // 60 min

const failsMap = new Map<string, FailState>()

function norm(email: string) { return (email || '').toLowerCase() }

export function checkLockedSeconds(email: string): number {
  const cur = failsMap.get(norm(email))
  const now = Date.now()
  if (cur && cur.lockedUntil && cur.lockedUntil > now) {
    return Math.ceil((cur.lockedUntil - now) / 1000)
  }
  return 0
}

export function registerFailureAndMaybeLock(email: string): number /* locked seconds (0 if not) */ {
  const key = norm(email)
  const now = Date.now()
  let cur = failsMap.get(key)
  if (!cur || now >= cur.winResetAt) {
    cur = { fails: 0, winResetAt: now + FAIL_WIN_MS, lockedUntil: 0, lockCount: cur?.lockCount ?? 0 }
  }
  cur.fails += 1
  if (cur.fails >= FAIL_MAX) {
    const pow = Math.min(cur.lockCount, 10)
    const lockSec = Math.min(LOCK_MAX_SEC, Math.max(LOCK_BASE_SEC, Math.floor(LOCK_BASE_SEC * Math.pow(2, pow))))
    cur.lockedUntil = now + lockSec * 1000
    cur.lockCount = (cur.lockCount || 0) + 1
    cur.fails = 0
    cur.winResetAt = now + FAIL_WIN_MS
    failsMap.set(key, cur)
    return Math.ceil((cur.lockedUntil - now) / 1000)
  }
  failsMap.set(key, cur)
  return 0
}

export function clearFailuresAndUnlock(email: string) {
  failsMap.delete(norm(email))
}

export function getLockInfo(email: string): { fails: number; lockCount: number; lockedUntil: number; winResetAt: number } | null {
  const cur = failsMap.get(norm(email))
  if (!cur) return null
  return { fails: cur.fails, lockCount: cur.lockCount, lockedUntil: cur.lockedUntil, winResetAt: cur.winResetAt }
}

