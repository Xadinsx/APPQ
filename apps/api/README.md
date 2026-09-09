# @appq/api

AppQuest REST API (Fastify + Prisma + PostgreSQL).

## Stack

- **Runtime:** Node.js 20+
- **Framework:** Fastify
- **ORM:** Prisma
- **Database:** PostgreSQL 16 (Docker Compose)
- **Validation:** Zod
- **Errors:** `{ error: { code, message, details? } }`

## Local setup

Requires **Docker Desktop** (or compatible engine) for Postgres.

```bash
# from repo root
cp apps/api/.env.example apps/api/.env
yarn
cd apps/api && docker compose up -d
yarn api:db:migrate:deploy   # or: yarn workspace @appq/api db:migrate
yarn api:dev
```

> If Docker is unavailable, you can point `DATABASE_URL` at any Postgres 16 instance and run `yarn workspace @appq/api db:migrate:deploy`.

Health check: `GET http://localhost:3000/health`

## Scripts

| Script | Purpose |
|--------|---------|
| `yarn api:dev` | Start API with hot reload |
| `yarn api:db:migrate` | Run Prisma migrations (dev) |
| `yarn api:db:seed` | Seed demo data (PR2+) |
| `yarn api:typecheck` | TypeScript check |

## Planned / implemented endpoints

| Method | Path | Status |
|--------|------|--------|
| `GET` | `/health` | Implemented |
| `POST` | `/auth/register` | Implemented |
| `POST` | `/auth/login` | Implemented |
| `POST` | `/auth/refresh` | Implemented |
| `POST` | `/auth/logout` | Implemented |
| `GET` | `/offers`, `/offers/:id` | Implemented |
| `GET` | `/quests` | Implemented |
| `POST` | `/quests/:id/start` | Implemented |
| `POST` | `/quests/:id/complete` | Implemented |
| `GET` | `/rewards` | Implemented |
| `POST` | `/rewards/:id/redeem` | Implemented |
| `GET` | `/profile` | Implemented |
| `GET` | `/transactions` | Implemented |

Demo seed user: `demo@appquest.dev` / `password123`

```bash
yarn api:db:seed
yarn workspace @appq/api test
# with server running:
bash apps/api/scripts/smoke.sh
```
