import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AppError } from '../../lib/errors.js';
import { parseParams } from '../../lib/validate.js';

const idParams = z.object({ id: z.string().min(1) });

export async function rewardsRoutes(app: FastifyInstance): Promise<void> {
  app.get('/rewards', { preHandler: [app.authenticate] }, async () => {
    const rewards = await app.prisma.reward.findMany({
      where: { active: true },
      orderBy: { pointsCost: 'asc' },
    });
    return { rewards };
  });

  app.post(
    '/rewards/:id/redeem',
    { preHandler: [app.authenticate] },
    async request => {
      const { id } = parseParams(request, idParams);
      const reward = await app.prisma.reward.findFirst({
        where: { id, active: true },
      });
      if (!reward) {
        throw new AppError(404, 'REWARD_NOT_FOUND', 'Reward not found');
      }

      const user = await app.prisma.user.findUniqueOrThrow({
        where: { id: request.user!.sub },
      });

      if (user.pointsBalance < reward.pointsCost) {
        throw new AppError(400, 'INSUFFICIENT_POINTS', 'Not enough points');
      }

      const result = await app.prisma.$transaction(async tx => {
        const updated = await tx.user.update({
          where: { id: user.id },
          data: { pointsBalance: { decrement: reward.pointsCost } },
        });

        await tx.transaction.create({
          data: {
            userId: user.id,
            amount: -reward.pointsCost,
            type: 'REWARD_REDEEM',
            referenceId: reward.id,
          },
        });

        return {
          reward,
          pointsBalance: updated.pointsBalance,
        };
      });

      return result;
    },
  );
}
