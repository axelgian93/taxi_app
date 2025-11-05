// src/plugins/error-schemas.ts
import fp from 'fastify-plugin'

type AnySchema = any

export default fp(async function errorSchemasPlugin(app) {
  app.addHook('onRoute', (routeOptions: any) => {
    const schema: AnySchema = routeOptions.schema
    if (!schema) return
    const resp = (schema.response = schema.response || {})
    const ensure = (code: number, example: string) => {
      if (resp[code]) return
      resp[code] = { type: 'object', properties: { error: { type: 'string' } }, example: { error: example } }
    }
    // Common error responses
    ensure(401, 'Unauthorized')
    ensure(403, 'Forbidden')
    ensure(409, 'Conflict')
    ensure(429, 'Too Many Requests')
  })
})

