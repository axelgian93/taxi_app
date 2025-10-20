// src/types/fastify.d.ts
import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: string
      role: 'ADMIN' | 'DRIVER' | 'RIDER'
      email: string
    }
  }
}
