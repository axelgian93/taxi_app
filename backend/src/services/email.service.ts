// src/services/email.service.ts
let nodemailer: any = null
try { nodemailer = require('nodemailer') } catch {}

type MailInput = { to: string; subject: string; text?: string; html?: string }

let transporter: any = null

function getTransport(): any {
  if (transporter) return transporter
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!nodemailer || !host || !user || !pass) return null
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
    auth: { user, pass },
  })
  return transporter
}

export async function sendMail(input: MailInput): Promise<boolean> {
  const t = getTransport()
  if (!t) return false
  const from = process.env.SMTP_FROM || process.env.ALERT_EMAIL_FROM || 'no-reply@localhost'
  await t.sendMail({ from, to: input.to, subject: input.subject, text: input.text, html: input.html })
  return true
}

export function tokenLink(templateEnvVar: string, token: string): string | null {
  const tpl = process.env[templateEnvVar]
  if (!tpl) return null
  return tpl.replace('{TOKEN}', encodeURIComponent(token))
}
