import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AppError } from '../../lib/errors.js';
import { parseParams } from '../../lib/validate.js';

const idParams = z.object({ id: z.string().min(1) });

export async function questsRoutes(app: FastifyInstance): Promise<void> {
  app.get('/quests', { preHandler: [app.authenticate] }, async request => {
    const quests = await app.prisma.quest.findMany({
      include: {
        offer: true,
        progress: {
          where: { userId: request.user!.sub },
        },
      },
      orderBy: { title: 'asc' },
    });

    return {
      quests: quests.map(quest => ({
        id: quest.id,
        title: quest.title,
        description: quest.description,
        pointsReward: quest.pointsReward,
        offerId: quest.offerId,
        offerTitle: quest.offer.title,
        status: quest.progress[0]?.status ?? 'PENDING',
      })),
    };
  });

  app.post(
    '/quests/:id/start',
    { preHandler: [app.authenticate] },
    async request => {
      const { id } = parseParams(request, idParams);
      const quest = await app.prisma.quest.findUnique({ where: { id } });
      if (!quest) {
        throw new AppError(404, 'QUEST_NOT_FOUND', 'Quest not found');
      }

      const progress = await app.prisma.questProgress.upsert({
        where: {
          userId_questId: {
            userId: request.user!.sub,
            questId: id,
          },
        },
        create: {
          userId: request.user!.sub,
          questId: id,
          status: 'STARTED',
          startedAt: new Date(),
        },
        update: {
          status: 'STARTED',
          startedAt: new Date(),
          completedAt: null,
        },
      });

      return { progress };
    },
  );

  app.post(
    '/quests/:id/complete',
    { preHandler: [app.authenticate] },
    async request => {
      const { id } = parseParams(request, idParams);
      const quest = await app.prisma.quest.findUnique({ where: { id } });
      if (!quest) {
        throw new AppError(404, 'QUEST_NOT_FOUND', 'Quest not found');
      }

      const existing = await app.prisma.questProgress.findUnique({
        where: {
          userId_questId: {
            userId: request.user!.sub,
            questId: id,
          },
        },
      });

      if (existing?.status === 'COMPLETED') {
        throw new AppError(
          409,
          'QUEST_ALREADY_COMPLETED',
          'Quest already completed',
        );
      }

      const result = await app.prisma.$transaction(async tx => {
        const progress = await tx.questProgress.upsert({
          where: {
            userId_questId: {
              userId: request.user!.sub,
              questId: id,
            },
          },
          create: {
            userId: request.user!.sub,
            questId: id,
            status: 'COMPLETED',
            startedAt: new Date(),
            completedAt: new Date(),
          },
          update: {
            status: 'COMPLETED',
            completedAt: new Date(),
          },
        });

        const user = await tx.user.update({
          where: { id: request.user!.sub },
          data: { pointsBalance: { increment: quest.pointsReward } },
        });

        await tx.transaction.create({
          data: {
            userId: request.user!.sub,
            amount: quest.pointsReward,
            type: 'QUEST_COMPLETE',
            referenceId: quest.id,
          },
        });

        return { progress, pointsBalance: user.pointsBalance };
      });

      return result;
    },
  );
}
