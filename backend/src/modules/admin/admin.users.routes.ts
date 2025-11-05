// src/modules/admin/admin.users.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'

type Role = 'ADMIN' | 'DRIVER' | 'RIDER'

export default async function adminUsersRoutes(app: FastifyInstance) {
  const bodySchema = { type: 'object', required: ['role'], properties: { role: { type: 'string', enum: ['ADMIN','DRIVER','RIDER'] } }, additionalProperties: false } as const

  // Change user role
  app.patch('/admin/users/:id/role', {
    schema: { operationId: 'adminUsersChangeRole', tags: ['admin'], summary: 'Cambiar rol de usuario', params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } }, body: bodySchema, response: { 200: { type: 'object', properties: { id: { type: 'string' }, email: { type: 'string' }, role: { type: 'string', enum: ['ADMIN','DRIVER','RIDER'] } } }, 404: { type: 'object', properties: { error: { type: 'string' } } } } },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const id = String((req.params || {}).id || '')
    const role = String((req.body || {}).role || '') as Role
    const found = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, role: true } })
    if (!found) return reply.code(404).send({ error: 'User not found' })
    if (found.role === role) return reply.send(found)
    const updated = await prisma.user.update({ where: { id }, data: { role } })
    // Audit
    try {
      const adminUserId = req.user?.id as string | undefined
      await prisma.$executeRawUnsafe('INSERT INTO "UserRoleAudit" ("adminUserId", "targetUserId", "beforeRole", "afterRole") VALUES ($1,$2,$3,$4)', adminUserId || null, id, found.role, role)
    } catch {}
    return reply.send({ id: updated.id, email: updated.email, role: updated.role as any })
  })
}

