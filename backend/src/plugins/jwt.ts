import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { env } from '../config/env';

declare module 'fastify' {
  interface FastifyInstance {
    auth: {
      verifyJWT: any;
      requireRole: (role: 'ADMIN' | 'DRIVER' | 'RIDER') => any;
    };
  }
  interface FastifyRequest {
    user: { id: string; role: 'ADMIN' | 'DRIVER' | 'RIDER'; email: string };
  }
}

export default fp(async (app) => {
  await app.register(jwt, {
    secret: env.jwtSecret,
  });

  app.decorate('auth', {
    verifyJWT: async (request: any, reply: any) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        return reply.code(401).send({ message: 'Unauthorized' });
      }
    },
    requireRole:
      (role: 'ADMIN' | 'DRIVER' | 'RIDER') =>
      async (request: any, reply: any) => {
        if (!request.user || request.user.role !== role) {
          return reply.code(403).send({ message: 'Forbidden' });
        }
      },
  });
});
