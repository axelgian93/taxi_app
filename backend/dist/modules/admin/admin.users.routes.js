"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminUsersRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function adminUsersRoutes(app) {
    const bodySchema = { type: 'object', required: ['role'], properties: { role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] } }, additionalProperties: false };
    // Change user role
    app.patch('/admin/users/:id/role', {
        schema: { operationId: 'adminUsersChangeRole', tags: ['admin'], summary: 'Cambiar rol de usuario', params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } }, body: bodySchema, response: { 200: { type: 'object', properties: { id: { type: 'string' }, email: { type: 'string' }, role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] } } }, 404: { type: 'object', properties: { error: { type: 'string' } } } } },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (req, reply) => {
        const id = String((req.params || {}).id || '');
        const role = String((req.body || {}).role || '');
        const found = await prisma_1.default.user.findUnique({ where: { id }, select: { id: true, email: true, role: true } });
        if (!found)
            return reply.code(404).send({ error: 'User not found' });
        if (found.role === role)
            return reply.send(found);
        const updated = await prisma_1.default.user.update({ where: { id }, data: { role } });
        // Audit
        try {
            const adminUserId = req.user?.id;
            await prisma_1.default.$executeRawUnsafe('INSERT INTO "UserRoleAudit" ("adminUserId", "targetUserId", "beforeRole", "afterRole") VALUES ($1,$2,$3,$4)', adminUserId || null, id, found.role, role);
        }
        catch { }
        return reply.send({ id: updated.id, email: updated.email, role: updated.role });
    });
}
//# sourceMappingURL=admin.users.routes.js.map