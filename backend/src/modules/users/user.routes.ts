// src/modules/users/user.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'

export default async function userRoutes(app: FastifyInstance) {
  const bodySchema = {
    type: 'object',
    required: ['fcmToken'],
    properties: { fcmToken: { type: 'string', minLength: 10, example: 'd5x...:APA91bH...' } },
    additionalProperties: false,
    example: { fcmToken: 'd5x...:APA91bHExampleToken' }
  } as const
  const okResponse = { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } } } as const

  app.post(
    '/users/me/push-token',
    { schema: { tags: ['users'], summary: 'Registrar FCM token', description: 'Registra o actualiza el FCM token del usuario logueado.', body: bodySchema, response: okResponse }, preHandler: app.auth.verifyJWT },
    async (req: any, reply) => {
      const userId = req.user?.id as string
      const { fcmToken } = req.body as { fcmToken: string }
      await prisma.user.update({ where: { id: userId }, data: { fcmToken } })
      return reply.send({ ok: true })
    }
  )

  app.delete(
    '/users/me/push-token',
    { schema: { tags: ['users'], summary: 'Eliminar FCM token', description: 'Borra el FCM token asociado al usuario (logout de push notifications).', response: okResponse }, preHandler: app.auth.verifyJWT },
    async (req: any, reply) => {
      const userId = req.user?.id as string
      await prisma.user.update({ where: { id: userId }, data: { fcmToken: null } })
      return reply.send({ ok: true })
    }
  )
}
