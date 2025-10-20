import '@fastify/jwt';
import 'fastify';
import { PrismaClient } from '@prisma/client';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: string; role: 'ADMIN' | 'DRIVER' | 'RIDER'; email: string };
    user: { id: string; role: 'ADMIN' | 'DRIVER' | 'RIDER'; email: string };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    auth: {
      verifyJWT: (request: any, reply: any) => Promise<void>;
      requireRole: (role: 'ADMIN' | 'DRIVER' | 'RIDER') => (request: any, reply: any) => Promise<void>;
    };
  }
}
