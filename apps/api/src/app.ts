import Fastify from 'fastify';
import cors from '@fastify/cors';
import prismaPlugin from './plugins/prisma.js';
import errorHandlerPlugin from './plugins/error-handler.js';
import authPlugin from './plugins/auth.js';
import { authRoutes } from './modules/auth/routes.js';
import { offersRoutes } from './modules/offers/routes.js';
import { questsRoutes } from './modules/quests/routes.js';
import { rewardsRoutes } from './modules/rewards/routes.js';
import { profileRoutes } from './modules/profile/routes.js';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, {
    origin: process.env.CORS_ORIGIN ?? true,
  });
  await app.register(errorHandlerPlugin);
  await app.register(prismaPlugin);
  await app.register(authPlugin);

  app.get('/health', async () => ({
    status: 'ok',
    service: 'appq-api',
    timestamp: new Date().toISOString(),
  }));

  await app.register(authRoutes);
  await app.register(offersRoutes);
  await app.register(questsRoutes);
  await app.register(rewardsRoutes);
  await app.register(profileRoutes);

  return app;
}
