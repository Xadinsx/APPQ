import fp from 'fastify-plugin';
import type { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { AppError } from '../lib/errors.js';
import { verifyAccessToken, type AccessTokenPayload } from '../lib/auth.js';

declare module 'fastify' {
  interface FastifyRequest {
    user?: AccessTokenPayload;
  }
}

function extractBearer(request: FastifyRequest): string {
  const header = request.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    throw new AppError(401, 'UNAUTHORIZED', 'Missing bearer token');
  }
  return header.slice('Bearer '.length).trim();
}

const authPlugin: FastifyPluginAsync = async app => {
  app.decorateRequest('user', undefined);

  app.decorate('authenticate', async (request: FastifyRequest) => {
    const token = extractBearer(request);
    request.user = await verifyAccessToken(token);
  });
};

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>;
  }
}

export default fp(authPlugin, { name: 'auth' });
