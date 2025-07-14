# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copia dependencias
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

# Copia el resto del proyecto (esto incluye angular.json, tsconfig.json, etc)
COPY . .

# Compila la app en modo producción
RUN npm run build -- --configuration=production

# Etapa de producción con Nginx
FROM nginx:alpine

# Copia archivos generados al servidor Nginx
COPY --from=builder /app/dist/login/ /usr/share/nginx/html

# ---- FIX DE PERMISOS PARA NGINX ----
RUN mkdir -p /var/cache/nginx && chown -R nginx:nginx /var/cache/nginx \
    && mkdir -p /run && chown -R nginx:nginx /run

USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
