FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

COPY public ./public
COPY app ./app
COPY services ./services
COPY public/src/globals.css ./globals.css
COPY public/google.svg ./public/google.svg
COPY next.config.js ./
COPY tsconfig.json ./

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
