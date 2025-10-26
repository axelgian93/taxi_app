// src/plugins/webhooks-raw.ts
import fp from 'fastify-plugin'

// Provides raw Buffer bodies for JSON content under the /webhooks/* prefix
export default fp(async (app) => {
  await app.register(async (scope) => {
    scope.addContentTypeParser('application/json', { parseAs: 'buffer' }, (req, body, done) => {
      done(null, body)
    })
    scope.addContentTypeParser('application/*+json', { parseAs: 'buffer' }, (req, body, done) => {
      done(null, body)
    })
  }, { prefix: '/webhooks' })
})

