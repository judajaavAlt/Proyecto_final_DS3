FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

COPY public ./public
COPY app ./app
COPY lib ./lib
COPY pages ./pages
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
# Define la variable de entorno PORT, que se usará en EXPOSE y por Next.js
ARG PORT=4200
ENV PORT=$PORT

EXPOSE $PORTt

CMD ["node", "server.js"]
