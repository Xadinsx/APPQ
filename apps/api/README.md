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
| `POST` | `/auth/register` | Sprint 3 PR2 |
| `POST` | `/auth/login` | Sprint 3 PR2 |
| `POST` | `/auth/refresh` | Sprint 3 PR2 |
| `POST` | `/auth/logout` | Sprint 3 PR2 |
| `GET` | `/offers`, `/offers/:id` | Sprint 3 PR2 |
| `GET` | `/quests` | Sprint 3 PR2 |
| `POST` | `/quests/:id/start` | Sprint 3 PR2 |
| `POST` | `/quests/:id/complete` | Sprint 3 PR2 |
| `GET` | `/rewards` | Sprint 3 PR2 |
| `POST` | `/rewards/:id/redeem` | Sprint 3 PR2 |
| `GET` | `/profile` | Sprint 3 PR2 |

WebSockets are deferred to a later epic.
