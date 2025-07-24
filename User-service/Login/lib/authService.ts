export async function loginUser(data: { email_or_username: string; password: string; }) {
  const response = await fetch("http://localhost:4000/saga/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Credenciales inválidas");
  }
  console.log("Ejecutando loginUser");
  const result = await response.json();

  // Guarda el token y el usuario
  if (result.token) {
    localStorage.setItem("token", result.token);
  }
  if (result.user) {
    localStorage.setItem("user", JSON.stringify(result.user));
  }

  return result;
}
