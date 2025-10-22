// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Log más detallado en dev, mínimo en prod
const logLevels =
  process.env.NODE_ENV !== 'production'
    ? (['query', 'error', 'warn'] as const)
    : (['error'] as const)

// Declaramos la propiedad en globalThis para que TypeScript no se queje
declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined
}

// Reutiliza la instancia en dev (hot-reload) y crea una nueva en prod
const prisma = globalThis.__prisma__ ?? new PrismaClient({ log: logLevels as any })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma__ = prisma
}

export default prisma
