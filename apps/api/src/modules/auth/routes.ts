import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AppError } from '../../lib/errors.js';
import { parseBody } from '../../lib/validate.js';
import {
  createRefreshTokenValue,
  hashPassword,
  hashToken,
  refreshExpiresAt,
  signAccessToken,
  verifyPassword,
} from '../../lib/auth.js';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(120).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  pointsBalance: number;
};

async function issueTokenPair(app: FastifyInstance, user: AuthUser) {
  const accessToken = await signAccessToken({
    sub: user.id,
    email: user.email,
  });
  const refreshToken = createRefreshTokenValue();
  await app.prisma.refreshToken.create({
    data: {
      tokenHash: hashToken(refreshToken),
      userId: user.id,
      expiresAt: refreshExpiresAt(),
    },
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      pointsBalance: user.pointsBalance,
    },
  };
}

export async function authRoutes(app: FastifyInstance): Promise<void> {
  app.post('/auth/register', async request => {
    const body = parseBody(request, credentialsSchema);
    const existing = await app.prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });
    if (existing) {
      throw new AppError(409, 'EMAIL_TAKEN', 'Email is already registered');
    }

    const user = await app.prisma.user.create({
      data: {
        email: body.email.toLowerCase(),
        passwordHash: await hashPassword(body.password),
        name: body.name ?? null,
      },
    });

    return issueTokenPair(app, user);
  });

  app.post('/auth/login', async request => {
    const body = parseBody(request, loginSchema);
    const user = await app.prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });
    if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
      throw new AppError(
        401,
        'INVALID_CREDENTIALS',
        'Invalid email or password',
      );
    }
    return issueTokenPair(app, user);
  });

  app.post('/auth/refresh', async request => {
    const body = parseBody(request, refreshSchema);
    const tokenHash = hashToken(body.refreshToken);
    const stored = await app.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new AppError(401, 'INVALID_REFRESH', 'Refresh token is invalid');
    }

    await app.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    return issueTokenPair(app, stored.user);
  });

  app.post(
    '/auth/logout',
    {
      preHandler: [app.authenticate],
    },
    async (request, reply) => {
      const body = parseBody(
        request,
        z.object({ refreshToken: z.string().min(1).optional() }).default({}),
      );

      if (body.refreshToken) {
        await app.prisma.refreshToken.updateMany({
          where: {
            tokenHash: hashToken(body.refreshToken),
            userId: request.user!.sub,
            revokedAt: null,
          },
          data: { revokedAt: new Date() },
        });
      } else {
        await app.prisma.refreshToken.updateMany({
          where: { userId: request.user!.sub, revokedAt: null },
          data: { revokedAt: new Date() },
        });
      }

      return reply.status(204).send();
    },
  );
}
