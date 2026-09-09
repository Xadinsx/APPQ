import Fastify from 'fastify';
import cors from '@fastify/cors';
import prismaPlugin from './plugins/prisma.js';
import errorHandlerPlugin from './plugins/error-handler.js';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: process.env.CORS_ORIGIN ?? true,
  });
  await app.register(errorHandlerPlugin);
  await app.register(prismaPlugin);

  app.get('/health', async () => ({
    status: 'ok',
    service: 'appq-api',
    timestamp: new Date().toISOString(),
  }));

  return app;
}
