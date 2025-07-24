# Microservicio_pelicula

## Microservicio de Películas 🎬

Este repositorio contiene un microservicio para la gestión y consulta de películas, diseñado para ser utilizado como parte de una arquitectura de microservicios. Incluye una API desarrollada en **FastAPI** (Python) y un mock backend en **Node.js** para pruebas rápidas.

---

### Características principales

- **API RESTful** para consultar películas, géneros y obtener recomendaciones.
- **Base de datos PostgreSQL** para almacenamiento persistente.
- **Docker Compose** para orquestar los servicios (backend, frontend, base de datos, pgAdmin).
- **CORS habilitado** para facilitar el desarrollo frontend-backend.
- **Mock backend** en Node.js para pruebas rápidas sin base de datos.
- **Frontend Next.js** con TypeScript para la interfaz de usuario.

---

## Estructura del proyecto

```
mf_movies/
├── Backend/                 # Backend Express (Node.js)
│   ├── index.js            # Servidor principal
│   ├── package.json        # Dependencias del backend
│   └── mockData.js         # Datos mock para el backend
├── project/                # Frontend Next.js
│   ├── app/               # Aplicación Next.js
│   │   ├── lib/           # Utilidades y servicios
│   │   │   ├── mockData.js    # Datos mock del frontend
│   │   │   └── moviePort.tsx  # Servicios de API
│   │   ├── types/         # Tipos TypeScript
│   │   └── ui/            # Componentes de UI
│   ├── package.json       # Dependencias del frontend
│   └── next.config.ts     # Configuración de Next.js
├── api.py                 # API FastAPI (Python)
├── db_connection.py       # Conexión a base de datos
├── docker-compose.yaml    # Configuración de Docker
├── requirements.txt       # Dependencias de Python
└── README.md             # Este archivo
```

---

## Tecnologías utilizadas

### Backend

- **Express.js** - Framework web para Node.js
- **CORS** - Middleware para permitir solicitudes cross-origin
- **Node.js** - Runtime de JavaScript

### Frontend

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **React** - Biblioteca de UI

### Base de datos

- **PostgreSQL** - Base de datos relacional
- **pgAdmin** - Interfaz web para administrar PostgreSQL

---

## Instalación y configuración

### Prerrequisitos

- Node.js (v18 o superior)
- npm o pnpm
- Python 3.8+ (para FastAPI)
- Docker y Docker Compose (opcional)

### Backend Express (Recomendado para desarrollo rápido)

1. **Navegar al directorio del backend:**

   ```bash
   cd mf_movies/Backend
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Iniciar el servidor:**

   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:3001`

### Frontend Next.js

1. **Navegar al directorio del proyecto:**

   ```bash
   cd mf_movies/project
   ```

2. **Instalar dependencias:**

   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Ejecutar en modo desarrollo:**

   ```bash
   pnpm dev
   # o
   npm run dev
   ```

4. **Para producción, construir y ejecutar:**

   ```bash
   pnpm build
   pnpm start
   ```

   El frontend estará disponible en `http://localhost:3000`

---

## API Endpoints

### Backend Express (Puerto 3001)

#### Obtener todas las películas

```http
GET http://localhost:3001/movies
```

#### Obtener película por ID

```http
GET http://localhost:3001/movies/:id
```

#### Obtener películas similares

```http
GET http://localhost:3001/movies/:id/similar
```

### Ejemplo de respuesta

```json
{
  "id": 1,
  "title": "Poor Things",
  "releaseDate": "December 8, 2023",
  "releaseYear": 2012,
  "duration": 141,
  "classification": "R",
  "rating": 4.5,
  "genres": ["Drama", "Sci-Fi", "Fantasy"],
  "synopsis": "A young woman, Bella Baxter, is resurrected by a brilliant scientist...",
  "posterUrl": "https://...",
  "heroposter": "https://...",
  "trailerUrl": "https://www.youtube.com/watch?v=..."
}
```

---

## Uso en el Frontend

### Importar funciones de API

```typescript
import {
  getAllMoviesFromAPI,
  getMovieByIdFromAPI,
  getSimilarMoviesFromAPI,
} from "../lib/moviePort";
```

### Ejemplo de uso

```typescript
// Obtener todas las películas
const movies = await getAllMoviesFromAPI();

// Obtener película específica
const movie = await getMovieByIdFromAPI(1);

// Obtener películas similares
const similarMovies = await getSimilarMoviesFromAPI(1);
```

---

## Docker (Opcional)

Para ejecutar todo el stack con Docker:

```bash
docker-compose up -d
```

Esto iniciará:

- Frontend en `http://localhost:3000`
- Backend Express en `http://localhost:3001`
- PostgreSQL en `localhost:5432`
- pgAdmin en `http://localhost:5050`

---

## Desarrollo

### Estructura de datos

Las películas siguen esta estructura:

```typescript
interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  releaseYear: number;
  duration: number;
  classification: string;
  rating: number;
  genres: string[];
  synopsis: string;
  posterUrl: string;
  heroposter: string;
  trailerUrl: string;
}
```

### Agregar nuevas rutas

Para agregar nuevos endpoints en el backend Express, edita `Backend/index.js`:

```javascript
app.get("/nueva-ruta", (req, res) => {
  // Tu lógica aquí
  res.json({ data: "respuesta" });
});
```

---

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## Contacto

Para preguntas o soporte, abre un issue en este repositorio.
