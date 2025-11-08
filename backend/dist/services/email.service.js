"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
exports.tokenLink = tokenLink;
// src/services/email.service.ts
let nodemailer = null;
try {
    nodemailer = require('nodemailer');
}
catch { }
let transporter = null;
function getTransport() {
    if (transporter)
        return transporter;
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!nodemailer || !host || !user || !pass)
        return null;
    transporter = nodemailer.createTransport({
        host,
        port,
        secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
        auth: { user, pass },
    });
    return transporter;
}
async function sendMail(input) {
    const t = getTransport();
    if (!t)
        return false;
    const from = process.env.SMTP_FROM || process.env.ALERT_EMAIL_FROM || 'no-reply@localhost';
    await t.sendMail({ from, to: input.to, subject: input.subject, text: input.text, html: input.html });
    return true;
}
function tokenLink(templateEnvVar, token) {
    const tpl = process.env[templateEnvVar];
    if (!tpl)
        return null;
    return tpl.replace('{TOKEN}', encodeURIComponent(token));
}
//# sourceMappingURL=email.service.js.map