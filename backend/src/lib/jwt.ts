// src/lib/jwt.ts
import jwt, { SignOptions, Secret } from 'jsonwebtoken'

const JWT_SECRET: Secret = process.env.JWT_SECRET ?? 'dev_secret'
const JWT_EXPIRES_IN: SignOptions['expiresIn'] = (process.env.JWT_EXPIRES_IN as any) ?? '7d'

export type AppJwtPayload = {
  sub: string
  email: string
  role: 'ADMIN' | 'DRIVER' | 'RIDER'
}

export function signJwt(payload: AppJwtPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyJwt(token: string): AppJwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as AppJwtPayload
  return decoded
}
