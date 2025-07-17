require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const app = express();

const PORT = process.env.PORT || 3001;
const DB_PATH = './db.json';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET
app.get('/api/reviews', async (req, res) => {
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

// POST
app.post('/api/reviews', async (req, res) => {
  const { user, comment, rating } = req.body;
  const newReview = await prisma.review.create({
    data: {
      author: user.name,
      avatar: user.avatar,
      text: comment,
      rating: Number(rating),
    },
  });
  res.status(201).json(newReview);
});


app.delete('/api/reviews/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readJson(DB_PATH);
  data.reviews = (data.reviews || []).filter(r => r.id !== parseInt(id));
  await fs.writeJson(DB_PATH, data, { spaces: 2 });
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Microservicio corriendo en http://localhost:${PORT}`);
});
