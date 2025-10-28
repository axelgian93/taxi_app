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
        example: { fcmToken: 'd5x...:APA91bHExampleToken' }
    };
    const okResponse = {
        200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } },
        401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } }
    };
    app.post('/users/me/push-token', { schema: { operationId: 'usersRegisterPushToken', tags: ['users'], summary: 'Registrar FCM token', description: 'Registra o actualiza el FCM token del usuario logueado.', body: bodySchema, response: okResponse }, preHandler: app.auth.verifyJWT }, async (req, reply) => {
        const userId = req.user?.id;
        const { fcmToken } = req.body;
        await prisma_1.default.user.update({ where: { id: userId }, data: { fcmToken } });
        return reply.send({ ok: true });
    });
    app.delete('/users/me/push-token', { schema: { operationId: 'usersDeletePushToken', tags: ['users'], summary: 'Eliminar FCM token', description: 'Borra el FCM token asociado al usuario (logout de push notifications).', response: okResponse }, preHandler: app.auth.verifyJWT }, async (req, reply) => {
        const userId = req.user?.id;
        await prisma_1.default.user.update({ where: { id: userId }, data: { fcmToken: null } });
        return reply.send({ ok: true });
    });
}
//# sourceMappingURL=user.routes.js.map