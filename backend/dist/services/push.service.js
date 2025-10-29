"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushToUser = sendPushToUser;
// src/services/push.service.ts
const node_fetch_1 = __importDefault(require("node-fetch"));
const prisma_1 = __importDefault(require("../lib/prisma"));
async function sendPushToUser(userId, opts) {
    try {
        const user = await prisma_1.default.user.findUnique({ where: { id: userId }, select: { fcmToken: true, email: true } });
        const token = user?.fcmToken || undefined;
        if (!token) {
            console.warn(`[push] No FCM token for user=${userId}`);
            return false;
        }
        const serverKey = process.env.FCM_SERVER_KEY;
        if (!serverKey) {
            console.warn('[push] Missing FCM_SERVER_KEY; skipping push');
            return false;
        }
        const tokenPreview = token.slice(0, 10) + '...' + token.slice(-6);
        const payload = {
            to: token,
            notification: { title: opts.title, body: opts.body },
            data: opts.data ?? {},
        };
        console.info('[push] Dispatch', {
            userId,
            tokenPreview,
            titleLen: opts.title?.length ?? 0,
            bodyLen: opts.body?.length ?? 0,
            dataKeys: Object.keys(payload.data || {}),
        });
        const res = await (0, node_fetch_1.default)('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${serverKey}`,
            },
            body: JSON.stringify(payload),
        });
        const text = await res.text().catch(() => '');
        if (!res.ok) {
            console.error('[push] FCM error', { status: res.status, body: text.slice(0, 300) });
            return false;
        }
        console.info('[push] FCM ok', { status: res.status, body: text.slice(0, 300) });
        return true;
    }
    catch (e) {
        console.error('[push] Unexpected error:', e);
        return false;
    }
}
//# sourceMappingURL=push.service.js.map