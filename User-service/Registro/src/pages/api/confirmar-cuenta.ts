// pages/api/confirmar-cuenta.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ detail: "Método no permitido" });
  }

  const { token } = req.query;
  if (!token || typeof token !== "string") {
    return res.status(400).json({ detail: "Token requerido en query string" });
  }

  try {
    // Llama directo al nginx gateway local (con port-forward activo)
    const response = await fetch(`http://localhost:4000/saga/confirmar?token=${encodeURIComponent(token)}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ detail: "Error interno del servidor" });
  }
}
