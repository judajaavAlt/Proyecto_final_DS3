# 🎬 Microservicio de Reseñas (Rating Service)

## 📁 Estructura del Proyecto

```
rating-service/
│
├── backend/
│   ├── prisma/                  # Migraciones y schema de Prisma
│   ├── src/                     # Código fuente del backend (endpoints, controladores, etc.)
│   ├── .env                     # Variables de entorno (NO subir al repo)
│   ├── package.json             # Dependencias y scripts
│   └── README.md                # Este archivo
│
└── frontend/
    ├── public/                  # Archivos estáticos
    ├── src/                     # Componentes y lógica del frontend
    ├── vite.config.js           # Configuración de Vite
    └── package.json             # Dependencias del frontend
```

---

## 🚀 Puesta en marcha

### 🔧 Backend

1. Clona el repositorio y navega al backend:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd rating-service/backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con tu cadena de conexión:

```env
# .env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_basedatos"
```

4. Ejecuta la migración:

```bash
npx prisma migrate dev --name init
```

5. Genera el cliente de Prisma:

```bash
npx prisma generate
```

6. Levanta el servidor:

```bash
npm run dev
```

Por defecto correrá en `http://localhost:PUERTO/api/reviews`.

---
