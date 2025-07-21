require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 3001;
const DB_PATH = './db.json';
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3002/validate-session';

const { PrismaClient } = require('@prisma/client');
let prisma;
const usePrisma = !!process.env.DATABASE_URL;
if (usePrisma) {
  prisma = new PrismaClient();
}

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
    const response = await fetch(`${AUTH_SERVICE_URL}/verify-session/`, {
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
    if (usePrisma) {
      const reviews = await prisma.review.findMany({
        orderBy: { id: 'desc' }
      });
      res.json(reviews);
    } else {
      // Leer de db.json
      const data = await fs.readJson(DB_PATH).catch(() => ({ reviews: [] }));
      res.json(data.reviews || []);
    }
  } catch (err) {
    console.error("Error al obtener reseñas:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// GET reviews de una película específica
app.get('/reviews/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    if (usePrisma) {
      const reviews = await prisma.review.findMany({
        where: { movieId: parseInt(movieId) },
        orderBy: { id: 'desc' }
      });
      res.json(reviews);
    } else {
      // Leer de db.json
      const data = await fs.readJson(DB_PATH).catch(() => ({ reviews: [] }));
      const filtered = (data.reviews || []).filter(r => r.movieId === parseInt(movieId));
      res.json(filtered);
    }
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
    if (usePrisma) {
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
    } else {
      // Guardar en db.json
      const data = await fs.readJson(DB_PATH).catch(() => ({ reviews: [] }));
      const reviews = data.reviews || [];
      const newReview = {
        id: reviews.length ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
        userId: userId,
        movieId: parseInt(movieId),
        text: comment,
        rating: Number(rating),
        date: new Date().toISOString(),
        author: sessionValidation.name
      };
      reviews.unshift(newReview);
      await fs.writeJson(DB_PATH, { reviews }, { spaces: 2 });
      res.status(201).json(newReview);
    }
  } catch (error) {
    console.error('❌ [POST] Error al crear reseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET promedio de rating por película
app.get('/reviews/average/:movieId', async (req, res) => {
  const { movieId } = req.params;
  
  try {
    if (usePrisma) {
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
    } else {
      // Calcular promedio desde db.json
      const data = await fs.readJson(DB_PATH).catch(() => ({ reviews: [] }));
      const movieReviews = (data.reviews || []).filter(r => r.movieId === parseInt(movieId));
      
      if (movieReviews.length === 0) {
        return res.json({ 
          average: 0, 
          count: 0, 
          movieId: parseInt(movieId) 
        });
      }
      
      const totalRating = movieReviews.reduce((sum, review) => sum + review.rating, 0);
      const average = totalRating / movieReviews.length;
      
      res.json({
        average: parseFloat(average.toFixed(1)),
        count: movieReviews.length,
        movieId: parseInt(movieId)
      });
    }
  } catch (err) {
    console.error("Error al obtener promedio:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Microservicio corriendo en http://localhost:${PORT}`);
});
