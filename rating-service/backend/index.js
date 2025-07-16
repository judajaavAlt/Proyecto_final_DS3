require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const app = express();

const PORT = process.env.PORT || 3001;
const DB_PATH = './db.json';

app.use(cors());
app.use(express.json());

app.get('/api/reviews', async (req, res) => {
  const data = await fs.readJson(DB_PATH);
  res.json(data.reviews || []);
});

app.post('/api/reviews', async (req, res) => {
  const { user, rating, comment } = req.body;
  const data = await fs.readJson(DB_PATH);
  const newReview = {
    id: Date.now(),
    author: user.name,
    avatar: user.avatar,
    rating: Number(rating),
    text: comment,
    date: new Date().toISOString().split('T')[0]
  };
  data.reviews = [newReview, ...(data.reviews || [])];
  await fs.writeJson(DB_PATH, data, { spaces: 2 });
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
