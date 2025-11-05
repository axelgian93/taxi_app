// src/plugins/admin-export-etag.ts
import fp from 'fastify-plugin'

export default fp(async function adminExportEtag(app) {
  app.addHook('onSend', async (req: any, reply, payload: any) => {
    try {
      if (req.method !== 'GET') return payload
      const url = String((req.raw?.url || '').split('?')[0])
      if (!/^\/admin\/(payments|trips)/.test(url)) return payload
      if (payload === undefined || payload === null) return payload
      let buf: Buffer
      if (Buffer.isBuffer(payload)) buf = payload
      else if (typeof payload === 'string') buf = Buffer.from(payload)
      else buf = Buffer.from(JSON.stringify(payload))
      const crypto = await import('crypto')
      const etag = 'W/"' + crypto.createHash('md5').update(buf).digest('hex') + '"'
      const inm = (req.headers['if-none-match'] as string) || ''
      if (inm === etag) {
        reply.code(304)
        // Ensure minimal body
        return ''
      }
      reply.header('ETag', etag)
      reply.header('Cache-Control', 'private, max-age=60')
      return payload
    } catch {
      return payload
    }
  })
})

