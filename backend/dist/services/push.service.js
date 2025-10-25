"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushToUser = sendPushToUser;
// src/services/push.service.ts
const prisma_1 = __importDefault(require("../lib/prisma"));
const node_fetch_1 = __importDefault(require("node-fetch"));
async function sendPushToUser(userId, opts) {
    try {
        const user = await prisma_1.default.user.findUnique({ where: { id: userId }, select: { fcmToken: true, email: true } });
        const token = user?.fcmToken;
        if (!token) {
            console.warn(`[push] No FCM token for user=${userId}`);
            return false;
        }
        const serverKey = process.env.FCM_SERVER_KEY;
        if (!serverKey) {
            console.warn('[push] Missing FCM_SERVER_KEY; skipping push');
            return false;
        }
        const res = await (0, node_fetch_1.default)('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${serverKey}`,
            },
            body: JSON.stringify({
                to: token,
                notification: { title: opts.title, body: opts.body },
                data: opts.data ?? {},
            }),
        });
        if (!res.ok) {
            const txt = await res.text().catch(() => '');
            console.error('[push] FCM error:', res.status, txt);
            return false;
        }
        return true;
    }
    catch (e) {
        console.error('[push] Unexpected error:', e);
        return false;
    }
}
//# sourceMappingURL=push.service.js.map