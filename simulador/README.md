# Simulador de Microservicio de Autenticación

Este es un simulador del microservicio de autenticación para probar la funcionalidad de reviews sin necesidad del servicio real.

## 🚀 Instalación y ejecución

```bash
cd simulador
npm install
npm run dev
```

El simulador correrá en `http://localhost:3002`

## 📋 Endpoints disponibles

### 1. **POST /login** - Simular inicio de sesión
```bash
curl -X POST http://localhost:3002/login \
  -H "Content-Type: application/json" \
  -d '{"username": "ana", "password": "123"}' \
  -c cookies.txt
```

**Credenciales válidas:**
- `username: "ana", password: "123"` → Ana Torres
- `username: "luis", password: "123"` → Luis Pérez

### 2. **POST /validate-session** - Validar sesión
```bash
curl -X POST http://localhost:3002/validate-session \
  -H "Content-Type: application/json" \
  -b cookies.txt
```

### 3. **POST /logout** - Cerrar sesión
```bash
curl -X POST http://localhost:3002/logout \
  -b cookies.txt
```

### 4. **GET /status** - Estado del servidor
```bash
curl http://localhost:3002/status
```

## 🧪 Cómo probar con tu microservicio de reviews

### 1. **Configurar la variable de entorno**
En `rating-service/backend/.env`:
```
AUTH_SERVICE_URL=http://localhost:3002/validate-session
```

### 2. **Iniciar los servicios**
```bash
# Terminal 1: Simulador de auth
cd simulador
npm run dev

# Terminal 2: Backend de reviews
cd rating-service/backend
npm run dev

# Terminal 3: Frontend
cd rating-service
npm run dev
```

### 3. **Probar el flujo completo**

#### **Caso 1: Usuario NO logueado**
1. Ve al frontend
2. Intenta crear una reseña
3. Debería aparecer el modal "Inicia sesión"

#### **Caso 2: Usuario logueado**
1. Haz login con curl:
```bash
curl -X POST http://localhost:3002/login \
  -H "Content-Type: application/json" \
  -d '{"username": "ana", "password": "123"}' \
  -c cookies.txt
```

2. Ve al frontend (las cookies se enviarán automáticamente)
3. Crea una reseña
4. Debería funcionar correctamente

## 📊 Sesiones simuladas

El simulador tiene estas sesiones predefinidas:

| Session ID | Usuario | Email |
|------------|---------|-------|
| `session123` | Ana Torres | ana@example.com |
| `session456` | Luis Pérez | luis@example.com |
| `session789` | María López | maria@example.com |

## 🔍 Logs del simulador

El simulador muestra logs detallados en la consola:
- 🔐 Validación de sesiones
- 🍪 Cookies recibidas
- ✅/❌ Resultados de validación
- 🔑 Intentos de login

## 🛠️ Personalización

Puedes modificar `validSessions` en `index.js` para agregar más usuarios o cambiar los datos de las sesiones. 