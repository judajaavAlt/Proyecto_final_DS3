// pages/api/confirmar-cuenta.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ detail: "Método no permitido" });
  }

  const { token } = req.query;
  const baseUrl = process.env.INTERNAL_API_URL || "http://saga-orchestrator:8000/saga";

  try {
    const response = await fetch(`${baseUrl}/confirmar?token=${token}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error: unknown) {
  let message = "Error interno del servidor";
  if (error instanceof Error) {
    message = error.message;
  }
  res.status(500).json({ detail: message });
}
}
