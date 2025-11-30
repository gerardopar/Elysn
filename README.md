# ELYSN AI Companion Platform

Elysn is an AI-native chat platform built around realtime GraphQL, OpenAI-backed persona intelligence, and a multilayer memory system.

## Repository Layout

- `apps/server` – Express + Apollo GraphQL API, WebSocket subscriptions, MCP endpoint, MongoDB + Redis, S3 uploads, Firebase Auth, OpenAI responses.
- `apps/client` – Ionic/React front-end with Apollo Client, Firebase auth, GraphQL queries/mutations/subscriptions, Vite tooling, Capacitor projects for iOS/Android.
- `packages/elysn-core` – Elysn’s intelligence engine: memory systems, persona behavior, and AI prompt logic, core models.
- `packages/shared` – Lightweight shared types (chat, message, user, memory).
- `pnpm-workspace.yaml` – Monorepo wiring for all packages/apps.

```text
elysn/
├── apps/
│ ├── server/ # Express + Apollo GraphQL API
│ │ ├── subscriptions # graphql-ws real-time messaging
│ │ ├── mcp/ # MCP endpoint & tools
│ │ ├── services/ # Mongo, Redis, OpenAI, Firebase
│ │ └── resolvers/ # GraphQL schema resolvers
│ │
│ └── client/ # Ionic/React (Vite) app
│ ├── apollo/ # Apollo Client setup
│ ├── components/ # UI & chat components
│ ├── hooks/ # GraphQL hooks, auth hooks
│ └── capacitor/ # iOS/Android native projects
│
├── packages/
│ ├── elysn-core/ # Memory system, prompt engine, classifiers
│ └── shared/ # Reusable TS types & enums
│
└── pnpm-workspace.yaml # Monorepo wiring
```

## Tech Stack

- **Runtime**: Node.js, TypeScript, pnpm workspaces.
- **Backend**: Express 5, Apollo Server 5, GraphQL schema-first, `graphql-ws` subscriptions, Redis Pub/Sub.
- **Data**: MongoDB (Mongoose), Redis.
- **Auth**: Firebase Admin (ID tokens).
- **AI**: OpenAI Responses API; prompt + memory system from `@elysn/core`.
- **Storage**: AWS S3 presigned uploads.
- **Client**: React 18, Ionic React, Apollo Client, Tailwind, Framer Motion/Lottie, Three.js, Capacitor.
- **MCP**: Model Context Protocol server exposed at `/mcp`.

## Prerequisites

- Node.js (latest LTS recommended)
- pnpm (`npm i -g pnpm`)
- MongoDB, Redis, Firebase project, AWS S3 bucket, and OpenAI API key for full functionality

## Quick Start

1. Install dependencies (from repo root):
   ```bash
   pnpm install
   ```
2. Create environment files (see **Environment Variables**).
3. Run the whole stack (API + client):
   ```bash
   pnpm dev
   ```
   - Server on `http://localhost:4000/graphql` (subscriptions on `ws://localhost:4000/graphql`)
   - Client on `http://localhost:5173`
4. (Optional) Dev with GraphQL codegen watchers for both apps:
   ```bash
   pnpm dev:watch
   ```

## Environment Variables (server)

Set these in `apps/server/.env` (or your preferred secret manager):

- `PORT` – API port (default `4000`)
- MongoDB: `MONGODB_USER`, `MONGODB_PASSWORD`, `MONGODB_HOST`, `MONGODB_DB`, `MONGODB_APPNAME`
- Redis: `REDIS_USERNAME`, `REDIS_PASSWORD`, `REDIS_HOST`, `REDIS_PORT`
- OpenAI: `OPEN_AI_KEY`
- Firebase Admin: `FIREBASE_SERVICE_ACCOUNT` (JSON string for service account)
- AWS S3 uploads: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_REGION`, `AWS_S3_BUCKET_NAME`

## Running Services Individually

- **API only** (`apps/server`):
  ```bash
  pnpm --filter server dev
  # GraphQL codegen when schema/operations change
  pnpm --filter server codegen
  ```
- **Client only** (`apps/client`):
  ```bash
  pnpm --filter client dev
  # GraphQL codegen for generated hooks/types
  pnpm --filter client codegen
  ```

## Code Generation

- Both apps use `graphql-codegen` (configs in `apps/*/codegen.ts`).
- Run `pnpm dev:watch` to keep client/server codegen in sync while developing, or trigger per app with `pnpm --filter <app> codegen:watch`.

## Build & Production

- API: `pnpm --filter server build` (TypeScript → `dist`)
- Client: `pnpm --filter client build` (Vite build → `apps/client/dist`)
- Shared packages: `pnpm --filter @elysn/core build`, `pnpm --filter @elysn/shared build`

## Notable Features

- GraphQL subscriptions for live chat updates and persona status.
- Persona memory system (short/long-term memories, topic extraction, classification, prompt assembly) via `@elysn/core`.
- MCP endpoint at `POST /mcp` for tool calls.
- S3 presigned URLs for profile uploads.
- Firebase-authenticated requests automatically inject Bearer tokens into Apollo Client (see `apps/client/src/apollo/ApolloClient.tsx`).
