// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Solo acepta POST
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Método no permitido" });
  }

  // Usa la URL interna (solo accesible desde Docker Compose)
  const baseUrl = process.env.INTERNAL_API_URL;

  try {
    const response = await fetch(`${baseUrl}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

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
