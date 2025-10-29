// scripts/export-openapi.ts
import 'dotenv/config'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'

async function main() {
  const port = Number(process.env.PORT || 8080)
  const base = `http://localhost:${port}`
  const res = await fetch(`${base}/docs/json`)
  if (!res.ok) {
    throw new Error(`GET /docs/json -> ${res.status} ${await res.text()}`)
  }
  const json = await res.text()
  const out = resolve(__dirname, '..', 'docs', 'openapi.json')
  mkdirSync(dirname(out), { recursive: true })
  // Ensure UTF-8 and clean BOM issues on Windows
  writeFileSync(out, json, { encoding: 'utf8' })
  console.log(`Exported OpenAPI to ${out}`)
}

main().catch((e) => {
  console.error('export-openapi failed:', e)
  process.exit(1)
})
