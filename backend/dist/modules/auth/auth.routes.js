"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function authRoutes(app) {
    // Schemas (Swagger + validaciÃ³n)
    const registerBodySchema = {
        type: 'object',
        required: ['email', 'password', 'firstName', 'lastName', 'role'],
        properties: {
            email: { type: 'string', format: 'email', example: 'driver@taxi.local' },
            password: { type: 'string', minLength: 6, example: '123456' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'], example: 'DRIVER' }
        },
        additionalProperties: false
    };
    const loginBodySchema = {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email', example: 'driver@taxi.local' },
            password: { type: 'string', minLength: 6, example: '123456' }
        },
        additionalProperties: false
    };
    const loginResponseSchema = {
        type: 'object',
        properties: {
            token: { type: 'string' },
            user: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] }
                }
            }
        }
    };
    // POST /auth/register
    app.post('/auth/register', {
        schema: {
            operationId: 'authRegister',
            tags: ['auth'],
            security: [],
            body: registerBodySchema,
            response: {
                201: loginResponseSchema,
                400: { type: 'object', properties: { error: { type: 'string' } } }
            }
        }
    }, async (req, reply) => {
        const { email, password, firstName, lastName, role } = req.body;
        const exists = await prisma_1.default.user.findUnique({ where: { email } });
        if (exists)
            return reply.code(400).send({ error: 'Email ya registrado' });
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: { email, passwordHash, firstName, lastName, role }
        });
        if (role === 'DRIVER') {
            await prisma_1.default.driverProfile.upsert({
                where: { userId: user.id },
                update: {},
                create: {
                    userId: user.id,
                    rating: 5.0,
                    totalTrips: 0,
                    status: 'IDLE', // enum vÃ¡lido
                    licenseNumber: "PENDING-{user.id}" // requerido por tu schema
                }
            });
        }
        if (role === 'RIDER') {
            await prisma_1.default.riderProfile.upsert({
                where: { userId: user.id },
                update: {},
                create: { userId: user.id }
            });
        }
        const token = app.jwt.sign({ id: user.id, email: user.email, role: user.role });
        return reply.code(201).send({
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
    });
    // POST /auth/login
    app.post('/auth/login', {
        schema: {
            operationId: 'authLogin',
            tags: ['auth'],
            security: [],
            body: loginBodySchema,
            response: {
                200: loginResponseSchema,
                401: { type: 'object', properties: { error: { type: 'string' } } }
            }
        }
    }, async (req, reply) => {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            return reply.code(401).send({ error: 'Credenciales invÃ¡lidas' });
        const ok = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!ok)
            return reply.code(401).send({ error: 'Credenciales invÃ¡lidas' });
        const token = app.jwt.sign({ id: user.id, email: user.email, role: user.role });
        return reply.send({
            token,
            user: { id: user.id, email: user.email, role: user.role }
        });
    });
    // GET /auth/me
    app.get('/auth/me', { schema: { operationId: 'authMe', tags: ['auth'], response: { 200: { type: 'object', properties: { user: { type: 'object', properties: { id: { type: 'string' }, email: { type: 'string' }, role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] }, firstName: { type: 'string' }, lastName: { type: 'string' } } } } }, 401: { type: 'object', properties: { error: { type: 'string' } } } } } }, async (req, reply) => {
        try {
            await req.jwtVerify();
        }
        catch {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, role: true, firstName: true, lastName: true }
        });
        return reply.send({ user });
    });
}
//# sourceMappingURL=auth.routes.js.map