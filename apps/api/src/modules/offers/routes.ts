import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AppError } from '../../lib/errors.js';
import { parseParams } from '../../lib/validate.js';

const idParams = z.object({ id: z.string().min(1) });

export async function offersRoutes(app: FastifyInstance): Promise<void> {
  app.get('/offers', { preHandler: [app.authenticate] }, async () => {
    const offers = await app.prisma.offer.findMany({
      orderBy: [{ featured: 'desc' }, { title: 'asc' }],
    });
    return { offers };
  });

  app.get('/offers/:id', { preHandler: [app.authenticate] }, async request => {
    const { id } = parseParams(request, idParams);
    const offer = await app.prisma.offer.findUnique({ where: { id } });
    if (!offer) {
      throw new AppError(404, 'OFFER_NOT_FOUND', 'Offer not found');
    }
    return { offer };
  });
}
