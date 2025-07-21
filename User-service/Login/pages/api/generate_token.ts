import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Método no permitido" });
  }

  const { userId, username } = req.body;

  if (!userId || !username) {
    return res.status(400).json({ detail: "Se requieren userId y username" });
  }

  try {
    const token = jwt.sign(
      { userId, username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' } // 24 horas de validez
    );

    // Configura la cookie (HttpOnly, Secure en producción)
    res.setHeader('Set-Cookie', [
      `review_token=${token}; Path=/; HttpOnly; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    ]);

    return res.status(200).json({ 
      success: true,
      message: "Token de review generado exitosamente"
    });
  } catch (error) {
    console.error("Error generando token:", error);
    return res.status(500).json({ detail: "Error interno del servidor" });
  }
}