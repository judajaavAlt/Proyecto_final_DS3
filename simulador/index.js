const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3002;

// Configurar CORS para permitir cookies
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Simular base de datos de sesiones válidas
const validSessions = {
  'session123': {
    id: 101,
    name: 'Ana Torres',
    email: 'ana@example.com'
  },
  'session456': {
    id: 102,
    name: 'Luis Pérez',
    email: 'luis@example.com'
  },
  'session789': {
    id: 103,
    name: 'María López',
    email: 'maria@example.com'
  }
};

// Endpoint para validar sesión
app.post('/validate-session', (req, res) => {
  console.log('🔐 Validando sesión...');
  console.log('Headers recibidos:', req.headers);
  
  // Extraer la cookie de sesión
  const sessionCookie = req.headers.cookie?.split('session=')[1]?.split(';')[0];
  
  console.log('🍪 Cookie de sesión:', sessionCookie);
  
  if (!sessionCookie) {
    console.log('❌ No hay cookie de sesión');
    return res.status(401).json({ 
      error: "No hay cookie de sesión",
      message: "Por favor inicia sesión"
    });
  }
  
  // Verificar si la sesión es válida
  const userData = validSessions[sessionCookie];
  
  if (userData) {
    console.log('✅ Sesión válida para usuario:', userData.name);
    res.json(userData);
  } else {
    console.log('❌ Sesión inválida:', sessionCookie);
    res.status(401).json({ 
      error: "Sesión inválida",
      message: "Por favor inicia sesión nuevamente"
    });
  }
});

// Endpoint para mostrar formulario de login en el navegador
app.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Login Simulado</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 400px; margin: 50px auto; padding: 20px; background: #1c1c1e; color: #e0e0e0; }
        .login-form { background: #232326; padding: 30px; border-radius: 8px; border: 1px solid #333; }
        input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #444; border-radius: 4px; background: #2c2c2e; color: #e0e0e0; }
        button { width: 100%; padding: 12px; background: #0a84ff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px; }
        button:hover { background: #0056b3; }
        .info { background: #333; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="login-form">
        <h2>🔐 Login Simulado</h2>
        <div class="info">
          <strong>Credenciales de prueba:</strong><br>
          • Usuario: <code>ana</code> / Contraseña: <code>123</code><br>
          • Usuario: <code>luis</code> / Contraseña: <code>123</code>
        </div>
        <form id="loginForm">
          <input type="text" id="username" placeholder="Usuario" required>
          <input type="password" id="password" placeholder="Contraseña" required>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <div id="result"></div>
      </div>
      
      <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          
          try {
            const response = await fetch('/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
              document.getElementById('result').innerHTML = 
                '<div style="color: #4CAF50; margin-top: 15px;">✅ Login exitoso! Redirigiendo al frontend...</div>';
              
              // Redirigir al frontend después de 2 segundos
              setTimeout(() => {
                window.location.href = 'http://localhost:5173';
              }, 2000);
            } else {
              document.getElementById('result').innerHTML = 
                '<div style="color: #f44336; margin-top: 15px;">❌ Error: ' + data.error + '</div>';
            }
          } catch (error) {
            document.getElementById('result').innerHTML = 
              '<div style="color: #f44336; margin-top: 15px;">❌ Error de conexión</div>';
          }
        });
      </script>
    </body>
    </html>
  `);
});

// Endpoint para login desde el frontend (mismo que el anterior pero con mejor manejo de CORS)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('🔑 Intento de login:', username);
  
  // Simular validación de credenciales
  if (username === 'ana' && password === '123') {
    const sessionId = 'session123';
    res.cookie('session', sessionId, {
      httpOnly: false, // Permitir acceso desde JavaScript
      secure: false, // false para desarrollo local
      sameSite: 'lax',
      domain: 'localhost', // Permitir acceso desde cualquier puerto en localhost
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
    });
    
    console.log('✅ Login exitoso para Ana Torres');
    res.json({ 
      message: 'Login exitoso',
      user: validSessions[sessionId]
    });
  } else if (username === 'luis' && password === '123') {
    const sessionId = 'session456';
    res.cookie('session', sessionId, {
      httpOnly: false, // Permitir acceso desde JavaScript
      secure: false, // false para desarrollo local
      sameSite: 'lax',
      domain: 'localhost', // Permitir acceso desde cualquier puerto en localhost
      maxAge: 24 * 60 * 60 * 1000
    });
    
    console.log('✅ Login exitoso para Luis Pérez');
    res.json({ 
      message: 'Login exitoso',
      user: validSessions[sessionId]
    });
  } else {
    console.log('❌ Login fallido');
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// Endpoint para logout
app.post('/logout', (req, res) => {
  res.clearCookie('session');
  console.log('🚪 Logout realizado');
  res.json({ message: 'Logout exitoso' });
});

// Endpoint de estado del servidor
app.get('/status', (req, res) => {
  res.json({ 
    status: 'running',
    message: 'Simulador de autenticación funcionando',
    port: PORT,
    validSessions: Object.keys(validSessions)
  });
});

app.listen(PORT, () => {
  console.log(`🔐 Simulador de autenticación corriendo en http://localhost:${PORT}`);
  console.log('📋 Sesiones válidas disponibles:');
  Object.entries(validSessions).forEach(([sessionId, user]) => {
    console.log(`   ${sessionId} -> ${user.name} (${user.email})`);
  });
  console.log('\n🧪 Para probar:');
  console.log('1. POST /login con {"username": "ana", "password": "123"}');
  console.log('2. POST /validate-session (con cookie de sesión)');
  console.log('3. POST /logout para limpiar sesión');
}); 