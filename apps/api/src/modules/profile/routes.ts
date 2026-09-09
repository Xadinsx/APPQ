import type { FastifyInstance } from 'fastify';

export async function profileRoutes(app: FastifyInstance): Promise<void> {
  app.get('/profile', { preHandler: [app.authenticate] }, async request => {
    const user = await app.prisma.user.findUniqueOrThrow({
      where: { id: request.user!.sub },
      select: {
        id: true,
        email: true,
        name: true,
        pointsBalance: true,
        createdAt: true,
      },
    });

    return { profile: user };
  });

  app.get(
    '/transactions',
    { preHandler: [app.authenticate] },
    async request => {
      const transactions = await app.prisma.transaction.findMany({
        where: { userId: request.user!.sub },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      return { transactions };
    },
  );
}
