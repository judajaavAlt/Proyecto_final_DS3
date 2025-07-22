require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 3001;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3002/validate-session';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Función para validar la sesión del usuario con el microservicio de autenticación
async function validateUserSession(req) {
  // Extraer la cookie 'session' del header
  const sessionCookie = req.headers.cookie?.split(';')
    .find(c => c.trim().startsWith('session='));
  
  if (!sessionCookie) {
    return null;
  }

  const sessionValue = sessionCookie.split('=')[1];

  try {
    // Usar fetch global de Node.js
    const response = await fetch(`${AUTH_SERVICE_URL}/saga/verify-session/`, {
      method: 'GET',
      headers: {
        'Cookie': `session=${sessionValue}`
      }
      // No body necesario
    });
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data; // { username, email }
  } catch (error) {
    console.error('Error validando sesión:', error);
    return null;
  }
}

// GET
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { id: 'desc' }
    });
    res.json(reviews);
  } catch (err) {
    console.error("Error al obtener reseñas:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// GET reviews de una película específica
app.get('/reviews/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await prisma.review.findMany({
      where: { movieId: parseInt(movieId) },
      orderBy: { id: 'desc' }
    });
    res.json(reviews);
  } catch (err) {
    console.error("Error al obtener reseñas por movieId:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// POST - Crear nueva reseña
app.post('/reviews', async (req, res) => {
  const sessionValidation = await validateUserSession(req);
  
  if (!sessionValidation) {
    return res.status(401).json({ 
      error: "No autenticado", 
      requiresLogin: true,
      message: "Debes iniciar sesión para crear reseñas"
    });
  }
  
  const userId = sessionValidation.id;
  const { comment, rating, movieId } = req.body;
  
  try {
    const newReview = await prisma.review.create({
      data: {
        text: comment,
        rating: Number(rating),
        userId: userId, // Usa el ID real del usuario autenticado
        movieId: parseInt(movieId)
      },
    });
    // Agregar solo el nombre del usuario autenticado a la respuesta
    const reviewWithUser = {
      ...newReview,
      author: sessionValidation.username
    };
    res.status(201).json(reviewWithUser);
  } catch (error) {
    console.error('❌ [POST] Error al crear reseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET promedio de rating por película
app.get('/reviews/average/:movieId', async (req, res) => {
  const { movieId } = req.params;
  
  try {
    const reviews = await prisma.review.findMany({
      where: { movieId: parseInt(movieId) },
      select: { rating: true }
    });
    
    if (reviews.length === 0) {
      return res.json({ 
        average: 0, 
        count: 0, 
        movieId: parseInt(movieId) 
      });
    }
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / reviews.length;
    
    res.json({
      average: parseFloat(average.toFixed(1)),
      count: reviews.length,
      movieId: parseInt(movieId)
    });
  } catch (err) {
    console.error("Error al obtener promedio:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Microservicio corriendo en http://localhost:${PORT}`);
});
