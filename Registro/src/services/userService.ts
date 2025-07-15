// lib/registerUser.ts

export async function registerUser(data: { username: string; email: string; password: string; }) {
  const response = await fetch('http://localhost:8000/saga/register/', {
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
