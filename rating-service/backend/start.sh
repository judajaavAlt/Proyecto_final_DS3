#!/bin/sh
until mysqladmin ping -h"db" -P"3306" --silent; do
  echo "Esperando a que la base de datos esté lista..."
  sleep 2
done
npx prisma generate
npx prisma db push
npm start 