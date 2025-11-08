// src/plugins/require-verified.ts
import fp from 'fastify-plugin'
import prisma from '../lib/prisma'

export default fp(async function requireVerified(app) {
  const mustVerify = (url: string): 'DRIVER'|'RIDER'|null => {
    // Driver: status/location endpoints and trip state endpoints
    if (/^\/drivers\/(status|location)/.test(url)) return 'DRIVER'
    if (/^\/trips\/[^/]+\/(accept|arrived|start|complete)$/.test(url)) return 'DRIVER'
    // Rider: payment setup/default
    if (/^\/payments\/(setup-intent|set-default)$/.test(url)) return 'RIDER'
    return null
  }
  app.addHook('onRoute', (routeOptions: any) => {
    const url: string = routeOptions.url || routeOptions.path || ''
    const roleReq = mustVerify(url)
    if (!roleReq) return
    const orig = Array.isArray(routeOptions.preHandler) ? routeOptions.preHandler.slice() : (routeOptions.preHandler ? [routeOptions.preHandler] : [])
    const guard = async (req: any, reply: any) => {
      try {
        await req.jwtVerify()
      } catch { return reply.code(401).send({ error: 'Unauthorized' }) }
      if (req.user?.role === 'ADMIN') return // admins bypass
      const u = await prisma.user.findUnique({ where: { id: req.user?.id }, select: { emailVerifiedAt: true, role: true } as any })
      const verified = Boolean((u as any)?.emailVerifiedAt)
      const role = (u as any)?.role
      if (roleReq === 'DRIVER' && role === 'DRIVER' && !verified) return reply.code(403).send({ error: 'Email not verified' })
      if (roleReq === 'RIDER' && role === 'RIDER' && !verified) return reply.code(403).send({ error: 'Email not verified' })
    }
    routeOptions.preHandler = [...orig, guard]
  })
})

