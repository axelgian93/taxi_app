"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function userRoutes(app) {
    const bodySchema = {
        type: 'object',
        required: ['fcmToken'],
        properties: { fcmToken: { type: 'string', minLength: 10, example: 'd5x...:APA91bH...' } },
        additionalProperties: false,
    };
    app.post('/users/me/push-token', { schema: { tags: ['users'], summary: 'Registrar FCM token', description: 'Registra o actualiza el FCM token del usuario logueado.', body: bodySchema, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } } }, preHandler: app.auth.verifyJWT }, async (req, reply) => {
        const userId = req.user?.id;
        const { fcmToken } = req.body;
        await prisma_1.default.user.update({ where: { id: userId }, data: { fcmToken } });
        return reply.send({ ok: true });
    });
}
//# sourceMappingURL=user.routes.js.map