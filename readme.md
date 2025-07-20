# 🎬 Sistema de Reseñas de Películas - Microservicios

Este proyecto implementa un sistema de reseñas de películas basado en microservicios, con autenticación distribuida y una arquitectura escalable.

## 🏗️ Arquitectura del Sistema

### **Microservicios:**

1. **🎭 Frontend (React + Vite)** - Puerto 5173
   - Interfaz de usuario para ver y crear reseñas
   - Sistema de calificación con estrellas
   - Modal de login cuando es necesario

2. **⭐ Rating Service** - Puerto 3001
   - API REST para gestionar reseñas
   - Validación de usuarios con microservicio de auth
   - Soporte para PostgreSQL (Prisma) y JSON como fallback

3. **🔐 Auth Simulator** - Puerto 3002
   - Simulador del microservicio de autenticación
   - Endpoints: login, validate-session, logout
   - Gestión de sesiones con cookies

## 🔄 Flujo de Autenticación

### **1. Login del Usuario:**
```
Usuario → Frontend → Auth Simulator (/login)
                ↓
Auth Simulator → Establece cookie: session=session123
                ↓
Usuario → Redirigido al Frontend con cookie
```

### **2. Creación de Reseña:**
```
Usuario → Frontend → Rating Service (/reviews POST)
                ↓
Rating Service → Auth Simulator (/validate-session)
                ↓
Auth Simulator → Valida cookie → Retorna datos del usuario
                ↓
Rating Service → Crea reseña con userId real
                ↓
Frontend → Muestra reseña con datos del usuario autenticado
```

## 🚀 Cómo Ejecutar el Proyecto

### **Prerrequisitos:**
- Node.js (v16+)
- npm o yarn
- PostgreSQL (opcional, se usa JSON como fallback)

### **1. Clonar y Configurar:**
```bash
git clone <repository-url>
cd Proyecto_final_DS3
```

### **2. Instalar Dependencias:**
```bash
# Frontend
cd rating-service
npm install

# Backend
cd backend
npm install

# Auth Simulator
cd ../../simulador
npm install
```

### **3. Configurar Variables de Entorno:**

**Backend (.env):**
```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/reviews_db
AUTH_SERVICE_URL=http://localhost:3002/validate-session
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:3001
```

### **4. Ejecutar Servicios:**

**Terminal 1 - Auth Simulator:**
```bash
cd simulador
npm start
```

**Terminal 2 - Backend:**
```bash
cd rating-service/backend
npm start
```

**Terminal 3 - Frontend:**
```bash
cd rating-service
npm run dev
```

## 🧪 Cómo Hacer Pruebas

### **1. Pruebas con cURL:**

#### **Login (Obtener Cookie):**
```bash
# Windows CMD
curl -c cookies.txt -X POST http://localhost:3002/login -H "Content-Type: application/json" -d "{\"username\":\"ana\",\"password\":\"123\"}"

# PowerShell
curl.exe -c cookies.txt -X POST http://localhost:3002/login -H "Content-Type: application/json" -d "{\"username\":\"ana\",\"password\":\"123\"}"
```

#### **Validar Sesión:**
```bash
curl -b cookies.txt -X POST http://localhost:3002/validate-session -H "Content-Type: application/json" -d "{\"session\":\"session123\"}"
```

#### **Obtener Reseñas:**
```bash
curl http://localhost:3001/reviews
```

#### **Crear Reseña:**
```bash
curl -b cookies.txt -X POST http://localhost:3001/reviews -H "Content-Type: application/json" -d "{\"comment\":\"Excelente película!\",\"rating\":5,\"movieId\":1}"
```

#### **Obtener Promedio:**
```bash
curl http://localhost:3001/reviews/average/1
```

### **2. Pruebas en el Navegador:**

#### **Inyectar Cookie Manualmente:**
```javascript
// En la consola del navegador (F12)
document.cookie = "session=session123; path=/; domain=localhost; max-age=86400";
```

#### **Verificar Cookie:**
```javascript
console.log(document.cookie);
```

#### **Limpiar Cookie:**
```javascript
document.cookie = "session=; path=/; domain=localhost; expires=Thu, 01 Jan 1970 00:00:00 GMT";
```

### **3. Usuarios de Prueba Disponibles:**

| Usuario | Password | ID | Nombre |
|---------|----------|----|--------|
| ana | 123 | 101 | Ana Torres |
| luis | 123 | 102 | Luis Pérez |
| maria | 123 | 103 | María García |
| carlos | 123 | 104 | Carlos López |

## 🔧 Endpoints Disponibles

### **Auth Simulator (Puerto 3002):**
- `POST /login` - Iniciar sesión
- `POST /validate-session` - Validar sesión
- `POST /logout` - Cerrar sesión
- `GET /status` - Estado del servicio

### **Rating Service (Puerto 3001):**
- `GET /reviews` - Obtener todas las reseñas
- `POST /reviews` - Crear nueva reseña (requiere autenticación)
- `GET /reviews/average/:movieId` - Promedio de calificaciones

## 🐛 Troubleshooting

### **Error 401 Unauthorized:**
1. Verificar que el auth simulator esté corriendo en puerto 3002
2. Verificar que la cookie esté inyectada correctamente
3. Revisar logs del backend para ver el flujo de validación

### **Error de Conexión:**
1. Verificar que todos los servicios estén corriendo
2. Verificar puertos disponibles
3. Revisar variables de entorno

### **Cookie no se Comparte:**
1. Verificar configuración CORS
2. Usar `domain: 'localhost'` en la cookie
3. Asegurar que `credentials: 'include'` esté configurado

## 📁 Estructura del Proyecto

```
Proyecto_final_DS3/
├── rating-service/          # Frontend + Backend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ReviewSection.jsx
│   │   │   └── ReviewSection.css
│   │   └── App.jsx
│   ├── backend/
│   │   ├── src/index.js     # API REST
│   │   ├── db.json          # Base de datos temporal
│   │   └── package.json
│   └── package.json
├── simulador/               # Auth Simulator
│   ├── index.js
│   └── package.json
├── cookies.txt              # Cookies de prueba
└── README.md
```

## 🔄 Flujo de Desarrollo

1. **Desarrollo Local:** Usar JSON como base de datos
2. **Testing:** Usar auth simulator para pruebas
3. **Producción:** Conectar con PostgreSQL y auth service real

## 📝 Notas Importantes

- El sistema está diseñado para funcionar sin base de datos (usa `db.json`)
- La autenticación se simula localmente para desarrollo
- Las cookies se comparten entre dominios `localhost`
- El frontend maneja errores 401 mostrando modal de login
- Los logs detallados ayudan a diagnosticar problemas

## 🚀 Próximos Pasos

- [ ] Implementar DELETE endpoint para reseñas
- [ ] Agregar validación de datos en frontend
- [ ] Implementar paginación de reseñas
- [ ] Agregar filtros por película
- [ ] Implementar sistema de likes/dislikes
