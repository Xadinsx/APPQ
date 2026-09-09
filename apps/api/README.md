# @appq/api

Stub workspace for the AppQuest backend.

## Planned stack

- **Runtime:** Node.js
- **API style:** REST
- **Database:** PostgreSQL

## Planned endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/auth/login` | Authenticate |
| `GET` | `/offers` | List offers |
| `GET` | `/offers/:id` | Offer detail |
| `GET` | `/quests` | List quests |
| `POST` | `/quests/:id/start` | Start a quest |
| `GET` | `/rewards` | List rewards |
| `POST` | `/rewards/:id/redeem` | Redeem a reward |
| `GET` | `/profile` | Current profile |
| `GET` | `/transactions` | Points ledger |

WebSocket support for live quest/reward updates is planned in a later epic.

This package intentionally has **no server implementation** in the Project Foundation sprint.
