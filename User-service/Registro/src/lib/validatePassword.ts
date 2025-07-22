// lib/validatePassword.ts
export function validatePassword(password: string): string | null {
  const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (regexStrong.test(password)) {
    return null; // Contraseña fuerte
  } else if (password.length >= 6) {
    return "Débil"; // Contraseña débil (pero algo tiene)
  } else {
    return "Muy débil"; // Muy corta o sin requisitos
  }
}
