# Architecture

## Context

AppQuest is a reward-based app discovery client (offers → quests → points → rewards). The mobile app is built with **React Native CLI** (not Expo-only) so native projects (`ios/`, `android/`), Gradle, CocoaPods, Hermes, and the New Architecture stay first-class training surfaces.

## Decision: feature-oriented folders

Code lives under `apps/mobile/src` by **feature**, not by dumping everything into flat `screens/` / `components/` / `utils/` buckets.

```text
src/
├── app/              # app shell, providers
├── features/         # auth, offers, quests, rewards, profile, notifications, …
├── components/       # shared UI primitives only
├── services/         # api, analytics, websocket (cross-cutting clients)
├── store/            # client state (Zustand planned)
├── navigation/       # navigators
└── utils/            # truly shared helpers
```

### Dependency rules

1. **Features may depend on** `components/`, `services/`, `store/`, `utils/`, and `navigation` types — not on other features’ internals.
2. **Shared `components/` must not import features.**
3. **`services/` must not import UI** (features or components).
4. Cross-feature needs go through **public feature entry points** or shared services/store — never deep imports into another feature’s screens.

Why: keeps boundaries interview-legible, scales as offers/quests/rewards grow, and matches how production RN codebases isolate domains.

## Decision: New Architecture on from day one

`newArchEnabled=true` (Android) and `RCTNewArchEnabled` (iOS). This aligns with later TurboModule / JSI experiments without a mid-project migration. Hermes remains enabled for startup/memory characteristics we will measure later.

## Design system (Sprint 2a)

UI is built with **Shopify Restyle** (typed tokens + variants), not a third-party component kit.

| Token | Value |
|-------|--------|
| Background (dark) | `#0B0D10` |
| Surface (dark) | `#14181F` |
| Accent | `#B8FF3C` (acid lime) |
| UI font | Space Grotesk |
| Points font | IBM Plex Mono |
| Icons | lucide-react-native |

Theme mode (dark default) persists via **MMKV**. Breakpoints: `phone` (&lt;390), `phoneLarge` (390–767), `tablet` (≥768). A `__DEV__`-only **Gallery** tab previews primitives and theme toggle.

Shared primitives live in `src/components/`; offer-specific UI lives in `features/offers/`.

## Deferred (intentional)

| Concern | Planned approach | Status |
|---------|------------------|--------|
| Server state | TanStack Query | Not in foundation |
| Client/UI state | Zustand | Theme preference uses MMKV for now |
| Backend | Node + PostgreSQL REST in `apps/api` | Stub only |
| Realtime | WebSockets | Later |
| Lists | FlashList | Offer Discover list uses FlashList + JSON fixtures |
| Native modules | Swift/Kotlin bridge | Later |
| Observability | Sentry + analytics/A/B | Later |
| E2E | Maestro | Later |

## Navigation (foundation + gallery)

Bottom tabs: **Home**, **Discover**, **Activity**, plus **Gallery** in `__DEV__` only. Auth stacks, Profile tab IA, and deep linking land in the Navigation epic (Sprint 2b).

## Git workflow

Trunk-based development on `main`, short-lived `feat/*` / `fix/*` PRs, Conventional Commits, CI lint + typecheck before merge (branch protection after first green run).
