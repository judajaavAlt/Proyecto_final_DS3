interface LoginResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export async function loginUser(data: { email: string; password: string }): Promise<LoginResponse> {
  try {
    const response = await fetch('http://localhost:3000/api/saga/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Credenciales inválidas");
    }

    const responseData: LoginResponse = await response.json();
    
    // Generar token de review después del login exitoso
    await generateReviewToken(responseData.user.id, responseData.user.username);

    return responseData;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

export async function generateReviewToken(userId: string, username: string): Promise<void> {
  try {
    const response = await fetch('http://localhost:3000/api/generate-token', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, username }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error generando token de review");
    }
  } catch (error) {
    console.error("Error generando token de review:", error);
    // No lanzamos error para no interrumpir el flujo de login
  }
}