import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export default async function authRoutes(app: FastifyInstance) {
  // ===========================
  //  POST /auth/login
  // ===========================
  app.post('/auth/login', {
    handler: async (req, reply) => {
      const bodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });
      const body = bodySchema.parse(req.body);

      const user = await app.prisma.user.findUnique({
        where: { email: body.email },
        select: { id: true, email: true, passwordHash: true, role: true, fullName: true },
      });
      if (!user) return reply.code(401).send({ message: 'Invalid credentials' });

      const ok = await bcrypt.compare(body.password, user.passwordHash);
      if (!ok) return reply.code(401).send({ message: 'Invalid credentials' });

      const token = app.jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        { expiresIn: '7d' }
      );

      return reply.send({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.fullName,
        },
      });
    },
  });

  // ===========================
  //  GET /me
  // ===========================
  app.get('/me', {
    preHandler: [app.auth.verifyJWT], // <- requiere token JWT
    handler: async (req, reply) => {
      const userId = req.user.id; // <- aquí accedes al usuario logueado

      const me = await app.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          role: true,
          fullName: true,
          phone: true,
        },
      });

      return reply.send(me);
    },
  });
}
