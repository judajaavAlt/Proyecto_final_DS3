// lib/registerUser.ts

export async function registerUser(data: { username: string; email: string; password: string; }) {
  // Ahora llamas a tu propia API route, no al orquestador directamente
  const response = await fetch("http://localhost:4000/saga/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error((await response.json()).detail || "Error en el registro");
  }

  return await response.json();
}
