import express from 'express';
import { checkUserId } from '../middleware/checkUserId.js';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', checkUserId, async (req, res) => {
  const { comment, rating, movieId } = req.body;
  const userId = req.userId;

  try {
    const review = await prisma.review.create({
      data: {
        comment,
        rating: parseFloat(rating),
        movieId,
        userId,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar reseña' });
  }
});
