#!/bin/sh
until pg_isready -h db-rating -p 5432; do
  echo "Esperando a que la base de datos PostgreSQL esté lista..."
  sleep 2
done
npx prisma generate
npx prisma db push
npm start
