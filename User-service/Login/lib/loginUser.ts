// lib/loginUser.ts
export async function loginUser(data: { email_or_username: string; password: string }) {
  const response = await fetch("http://localhost:4000/saga/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error((await response.json()).detail || "Error en el inicio de sesión");
  }

  return await response.json();
}
