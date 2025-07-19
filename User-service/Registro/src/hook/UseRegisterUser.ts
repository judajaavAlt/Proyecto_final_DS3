import { useState } from "react";
import { registerUser } from "@/lib/registerUser";
import { validatePassword } from "@/lib/validatePassword";

export function useRegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    captcha: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.captcha) {
      setError("Por favor verifica que no eres un robot.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!form.username || !form.email || !form.password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      setSuccess("¡Usuario registrado exitosamente!");
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        captcha: false,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("No se pudo registrar el usuario.");
      }
    }
  };

  return {
    form,
    setForm,
    error,
    success,
    handleChange,
    handleSubmit,
  };
}
