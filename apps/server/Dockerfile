FROM node:22-slim

RUN corepack enable && corepack prepare pnpm@10.10.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./

COPY packages ./packages

COPY apps/server ./apps/server

RUN pnpm install --frozen-lockfile

RUN pnpm -F @elysn/shared build
RUN pnpm -F @elysn/core build

WORKDIR /app/apps/server
RUN pnpm build

EXPOSE 4000

CMD ["node", "dist/index.js"]