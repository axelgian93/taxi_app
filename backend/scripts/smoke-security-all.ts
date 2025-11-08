// scripts/smoke-security-all.ts
import { spawn } from 'child_process'

type Step = { name: string; cmd: string }

const steps: Step[] = [
  { name: 'authz', cmd: 'npm run smoke:security-authz' },
  { name: 'hpp', cmd: 'npm run smoke:security-hpp' },
  { name: 'csp', cmd: 'npm run smoke:security-csp' },
  { name: 'cors', cmd: 'npm run smoke:security-cors' },
  { name: 'login-rl', cmd: 'npm run smoke:security-login-rl' },
  { name: 'sse', cmd: 'npm run smoke:security-sse' },
]

async function run(cmd: string): Promise<number> {
  return new Promise((resolve) => {
    const p = spawn(cmd, { shell: true, stdio: 'inherit' })
    p.on('exit', (code) => resolve(code ?? 1))
    p.on('error', () => resolve(1))
  })
}

async function main() {
  const results: Record<string, number> = {}
  for (const s of steps) {
    // eslint-disable-next-line no-console
    console.log(`\n=== Running ${s.name} ===`)
    const code = await run(s.cmd)
    results[s.name] = code
  }
  // Summary
  // eslint-disable-next-line no-console
  console.log('\n=== Security Smoke Summary ===')
  for (const s of steps) {
    const ok = results[s.name] === 0 ? 'OK' : 'FAIL'
    // eslint-disable-next-line no-console
    console.log(`${s.name.padEnd(10)}: ${ok}`)
  }
  const failed = Object.values(results).some(c => c !== 0)
  process.exit(failed ? 1 : 0)
}

main().catch((e) => { console.error(e); process.exit(1) })

