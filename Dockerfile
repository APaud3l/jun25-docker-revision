# syntax=docker/dockerfile:1

# Stage 1: dependencies (cached)
FROM node:lts-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# Stage 2: runtime (clean)
FROM node:lts-alpine3.22 AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY . .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]