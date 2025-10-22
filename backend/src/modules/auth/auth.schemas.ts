// src/modules/auth/auth.schemas.ts
import { z } from 'zod'

export const loginSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4),
  }),
  response: {
    200: z.object({
      token: z.string(),
      user: z.object({
        id: z.string(),
        email: z.string(),
        role: z.enum(['ADMIN', 'DRIVER', 'RIDER']),
      }),
    }),
  },
}

export const registerSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['DRIVER', 'RIDER']),
  }),
  response: {
    201: z.object({
      id: z.string(),
      email: z.string(),
      role: z.string(),
    }),
  },
}
