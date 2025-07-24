FROM node:20

# Instala cliente PostgreSQL (para usar pg_isready)
RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

COPY .env .env
COPY package.json package-lock.json ./
RUN npm install

COPY . .

COPY start.sh .
RUN chmod +x start.sh

EXPOSE 3001
CMD ["./start.sh"]
