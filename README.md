# AppQuest (APPQ)

Reward-based app discovery platform — a portfolio training project for production React Native engineering.

Users discover offers, complete quests, earn points, and redeem rewards. This repository is a **yarn workspaces monorepo**; the first milestone is Project Foundation (scaffold + architecture + quality), not the full product yet.

## Monorepo map

```text
apps/mobile   React Native CLI app (TypeScript, Hermes, New Architecture)
apps/api      Backend stub (Node + PostgreSQL planned)
docs/         Architecture decisions
```

## Prerequisites

- Node.js 22+
- Yarn 3 (via Corepack: `corepack enable`)
- Xcode + CocoaPods (iOS)
- Android Studio + SDK / emulator (Android)

## Setup

```bash
corepack enable
yarn install
```

### iOS

```bash
cd apps/mobile/ios
bundle install
bundle exec pod install
cd ../..
yarn mobile:ios
```

### Android

```bash
yarn mobile:android
```

### Metro

```bash
yarn mobile:start
```

## Quality

```bash
yarn lint
yarn typecheck
```

Commits use [Conventional Commits](https://www.conventionalcommits.org/). Husky runs lint-staged and commitlint locally; GitHub Actions runs lint + typecheck on `main` / PRs.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## License

MIT
