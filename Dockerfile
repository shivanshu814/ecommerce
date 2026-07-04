FROM node:20-alpine AS base

FROM base AS builder

WORKDIR /home/node/app
COPY package*.json ./
COPY yarn.lock ./

COPY . .
RUN yarn install

# Placeholders for Next.js build only — runtime uses Render env vars
ENV NODE_ENV=production
ENV PAYLOAD_SECRET=docker-build-placeholder-secret-key
ENV DATABASE_URI=mongodb://127.0.0.1/render-build
ENV PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=http://localhost:3000

RUN yarn build:docker

FROM base AS runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload/payload.config.js

WORKDIR /home/node/app
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public

EXPOSE 3000

CMD ["node", "dist/server.js"]
