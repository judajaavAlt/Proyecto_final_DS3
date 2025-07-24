// lib/loginUser.ts
export async function loginUser(data: { email_or_username: string; password: string }) {
  const response = await fetch("http://localhost:4000/saga/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // Por si usas cookies, puedes dejarlo así
  });

  if (!response.ok) {
    throw new Error((await response.json()).detail || "Error en el inicio de sesión");
  }

  const result = await response.json();

  // Guarda el token y el usuario en Local Storage
  if (result.token) {
    localStorage.setItem("token", result.token);
  }
  if (result.user) {
    localStorage.setItem("user", JSON.stringify(result.user));
  }

  return result;
}
