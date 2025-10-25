"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/lib/prisma.ts
const client_1 = require("@prisma/client");
// Log más detallado en dev, mínimo en prod
const logLevels = process.env.NODE_ENV !== 'production'
    ? ['query', 'error', 'warn']
    : ['error'];
// Reutiliza la instancia en dev (hot-reload) y crea una nueva en prod
const prisma = globalThis.__prisma__ ?? new client_1.PrismaClient({ log: logLevels });
if (process.env.NODE_ENV !== 'production') {
    globalThis.__prisma__ = prisma;
}
exports.default = prisma;
//# sourceMappingURL=prisma.js.map