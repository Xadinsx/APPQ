import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth.js';

const prisma = new PrismaClient();

const offers = [
  {
    id: 'offer-1',
    title: 'Example Game',
    subtitle: 'Play and clear early levels to earn points',
    category: 'Game',
    maxPoints: 5000,
    featured: true,
    badge: 'New',
  },
  {
    id: 'offer-2',
    title: 'Finance Tracker',
    subtitle: 'Install and complete onboarding',
    category: 'Finance',
    maxPoints: 2500,
    featured: false,
    badge: 'Hot',
  },
  {
    id: 'offer-3',
    title: 'Puzzle Quest',
    subtitle: 'Reach level 10 for bonus points',
    category: 'Game',
    maxPoints: 3200,
    featured: false,
    badge: null,
  },
  {
    id: 'offer-4',
    title: 'News Digest',
    subtitle: 'Read 5 articles this week',
    category: 'Content',
    maxPoints: 1800,
    featured: false,
    badge: 'Easy',
  },
  {
    id: 'offer-5',
    title: 'Fitness Loop',
    subtitle: 'Log workouts for 3 days',
    category: 'Lifestyle',
    maxPoints: 2200,
    featured: false,
    badge: null,
  },
  {
    id: 'offer-6',
    title: 'Photo Lab',
    subtitle: 'Create and share one edit',
    category: 'Creative',
    maxPoints: 1500,
    featured: false,
    badge: 'New',
  },
  {
    id: 'offer-7',
    title: 'Language Sprint',
    subtitle: 'Finish the starter lesson pack',
    category: 'Education',
    maxPoints: 2800,
    featured: false,
    badge: null,
  },
  {
    id: 'offer-8',
    title: 'Arcade Racer',
    subtitle: 'Win 3 ranked races',
    category: 'Game',
    maxPoints: 4500,
    featured: false,
    badge: 'Hot',
  },
];

async function main(): Promise<void> {
  const passwordHash = await hashPassword('password123');

  await prisma.user.upsert({
    where: { email: 'demo@appquest.dev' },
    update: {
      passwordHash,
      name: 'Demo Player',
      pointsBalance: 12450,
    },
    create: {
      email: 'demo@appquest.dev',
      passwordHash,
      name: 'Demo Player',
      pointsBalance: 12450,
    },
  });

  for (const offer of offers) {
    await prisma.offer.upsert({
      where: { id: offer.id },
      update: offer,
      create: offer,
    });

    const existingQuest = await prisma.quest.findFirst({
      where: { offerId: offer.id },
    });

    if (!existingQuest) {
      await prisma.quest.create({
        data: {
          offerId: offer.id,
          title: `Start ${offer.title}`,
          description: offer.subtitle,
          pointsReward: Math.round(offer.maxPoints / 5),
        },
      });
    }
  }

  const rewards = [
    {
      id: 'reward-1',
      title: 'Amazon Gift Card $5',
      description: 'Digital code delivered in-app',
      pointsCost: 5000,
    },
    {
      id: 'reward-2',
      title: 'AppQuest Sticker Pack',
      description: 'Exclusive digital stickers',
      pointsCost: 800,
    },
  ];

  for (const reward of rewards) {
    await prisma.reward.upsert({
      where: { id: reward.id },
      update: {
        title: reward.title,
        description: reward.description,
        pointsCost: reward.pointsCost,
        active: true,
      },
      create: {
        ...reward,
        active: true,
      },
    });
  }

  console.log('Seed complete: demo@appquest.dev / password123');
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
