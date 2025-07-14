"use client";
import React, { useState } from "react";
import styles from "./RegisterModal.module.css";
import { registerUser } from "@/services/userService"; // Ajusta la ruta según tu proyecto

export default function RegisterModal() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    captcha: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // TIPADO para handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // TIPADO para handleSubmit
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
      // TIPADO correcto para err
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("No se pudo registrar el usuario.");
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn}>&times;</button>
        <h2 className={styles.title}>Regístrate</h2>
        <p className={styles.subtitle}>Crea una cuenta y únete a XXXX.</p>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            required
            value={form.username}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Crea una contraseña"
            required
            value={form.password}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <div className={styles.recaptcha}>
            <input
              type="checkbox"
              id="captcha"
              name="captcha"
              className={styles.captchaCheckbox}
              checked={form.captcha}
              onChange={handleChange}
            />
            <label htmlFor="captcha" className={styles.captchaLabel}>
              I am not a robot
            </label>
            <span className={styles.recaptchaError}>
              {error === "Por favor verifica que no eres un robot." && error}
            </span>
            <div className={styles.recaptchaImg}>
              <img
                src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                alt="reCAPTCHA"
              />
            </div>
          </div>
          {error && error !== "Por favor verifica que no eres un robot." && (
            <div style={{ color: "red", margin: "8px 0" }}>{error}</div>
          )}
          {success && (
            <div style={{ color: "green", margin: "8px 0" }}>{success}</div>
          )}
          <button type="submit" className={styles.mainBtn}>
            Crear cuenta
          </button>
        </form>
        <div className={styles.googleBtn}>
          <img src="/google.svg" alt="Google" className={styles.googleLogo} />
          <span>Sign up with Google</span>
        </div>
        <p className={styles.signin}>
          ¿Ya tienes una cuenta? <a href="#">Inicia sesión aquí.</a>
        </p>
      </div>
    </div>
  );
}
