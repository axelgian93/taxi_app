// src/plugins/hpp-sanitize.ts
import fp from 'fastify-plugin'

export default fp(async function hppSanitize(app) {
  const MAX_REPEATED = Number(process.env.HPP_MAX_REPEATED || 5)
  app.addHook('preValidation', async (req, _reply) => {
    // If some query key appears more than MAX_REPEATED times (array), trim it
    const q: any = req.query
    if (!q || typeof q !== 'object') return
    for (const k of Object.keys(q)) {
      const v: any = (q as any)[k]
      if (Array.isArray(v) && v.length > MAX_REPEATED) {
        ;(q as any)[k] = v.slice(0, MAX_REPEATED)
      }
    }
  })
})

