import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Método no permitido" });
  }

  try {
    const response = await fetch(`${process.env.INTERNAL_API_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    if (response.ok) {
      // Establecer cookie de sesión si es necesario
      res.setHeader('Set-Cookie', [
        `session=active; Path=/; HttpOnly; SameSite=Lax`
      ]);
    }

    res.status(response.status).json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error interno del servidor";
    res.status(500).json({ detail: message });
  }
}