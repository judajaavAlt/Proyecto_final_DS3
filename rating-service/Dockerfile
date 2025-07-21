# ----------- Etapa 1: Construcción del frontend ----------- #
FROM node:20 AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
COPY vite.config.js ./
COPY .env ./
COPY public ./public
COPY index.html ./
COPY src ./src

RUN npm install
RUN npm run build

# ----------- Etapa 2: Configuración del backend ----------- #
FROM node:20 AS backend

WORKDIR /app

# Copiar backend
COPY backend/package.json backend/package-lock.json ./backend/
COPY backend/src ./backend/src
COPY backend/.env ./backend/
COPY backend/db.json ./backend/

RUN cd backend && npm install

# Copiar frontend compilado a backend/public
COPY --from=frontend /app/dist ./backend/public

EXPOSE 3001

CMD ["node", "backend/src/index.js"]
