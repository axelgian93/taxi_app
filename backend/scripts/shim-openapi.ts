// scripts/shim-openapi.ts
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

type HttpMethod = 'get'|'post'|'put'|'patch'|'delete'|'options'|'head'

function ensureOperationIds(doc: any) {
  const used = new Set<string>()
  const makeId = (path: string, method: string) => {
    // e.g., /auth/login -> authLogin
    const parts = path.split('/').filter(Boolean)
    const base = (parts[0] || 'op')
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^(\d)/, '_$1')
    const tail = parts.slice(1).map(p => p.replace(/\{.*?\}/g, 'By')).join('')
    let id = (base + (tail ? (tail[0].toUpperCase()+tail.slice(1)) : '')).replace(/[^a-zA-Z0-9_]/g,'')
    if (!id) id = 'op'
    id = id[0].toLowerCase() + id.slice(1)
    let k = id
    let i = 2
    while (used.has(k)) { k = id + i; i++ }
    used.add(k)
    return k
  }
  for (const p of Object.keys(doc.paths || {})) {
    const item = doc.paths[p]
    for (const m of Object.keys(item)) {
      const mm = m.toLowerCase() as HttpMethod
      if (!['get','post','put','patch','delete','options','head'].includes(mm)) continue
      const op = item[mm]
      if (!op) continue
      if (op.operationId && !used.has(op.operationId)) {
        used.add(op.operationId)
        continue
      }
      op.operationId = makeId(p, mm)
    }
  }
}

function main() {
  const inPath = resolve(__dirname, '..', 'docs', 'openapi.json')
  const raw = readFileSync(inPath, 'utf8')
  const doc = JSON.parse(raw)

  // Normalize spec version for generators
  doc.openapi = '3.0.3'

  // Ensure every operation has a unique operationId
  ensureOperationIds(doc)

  // Inject response examples for admin payments endpoints (safer here than touching TS with encoding quirks)
  const setJson200Example = (path: string, example: any) => {
    const p = doc.paths?.[path]?.get
    if (!p) return
    const resp = p.responses?.['200']
    const json = resp?.content?.['application/json']
    if (json?.schema) {
      json.schema.example = example
    }
  }
  setJson200Example('/admin/payments/top-drivers', {
    items: [ { driverId: 'usr_drv_1', email: 'driver@taxi.local', fullName: 'John Doe', trips: 5, amountUsd: 42.3 } ],
    totals: { trips: 5, amountUsd: 42.3 }
  })
  setJson200Example('/admin/payments/top-riders', {
    items: [ { riderId: 'usr_rdr_1', email: 'rider@taxi.local', fullName: 'Jane Roe', trips: 6, amountUsd: 55.8 } ],
    totals: { trips: 6, amountUsd: 55.8 }
  })
  setJson200Example('/admin/payments/summary-status', {
    items: [ { status: 'PAID', count: 10, amountUsd: 80.1 }, { status: 'FAILED', count: 1, amountUsd: 7.5 } ],
    totals: { count: 11, amountUsd: 87.6 }
  })
  // Extended (if present)
  setJson200Example('/admin/payments/extended', {
    items: [ { id: 'pay_123', tripId: 'trp_123', amountUsd: 7.8, status: 'PAID', method: 'CASH', provider: null, externalId: null, createdAt: '2025-01-01T12:20:00.000Z', updatedAt: '2025-01-01T12:20:00.000Z', isAuthorized: false, isPaid: true, isFailed: false, providerDisplay: 'Cash', capturable: false, riderEmail: 'rider@taxi.local', driverEmail: 'driver@taxi.local' } ],
    nextCursor: null
  })

  writeFileSync(inPath, JSON.stringify(doc), 'utf8')
  console.log('Shimmed OpenAPI ->', inPath)
}

main()
