"use client";
import React, { useState } from "react";
import styles from "./LoginModal.module.css";
import { loginUser } from "../../lib/loginUser";

export default function LoginModal() {
  const [form, setForm] = useState({
    email_or_username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVisible, setIsVisible] = useState(true);

   const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email_or_username || !form.password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    
    try {
      const response = await loginUser({
        email_or_username: form.email_or_username,
        password: form.password,
      });
      // Guardar el JWT en la cookie 'session' por 12 horas
      if (response.token) {
        const expires = new Date(Date.now() + 12 * 60 * 60 * 1000).toUTCString();
        document.cookie = `session=${response.token}; expires=${expires}; path=/`;
      }
      setSuccess("¡Inicio de sesión exitoso!");
      setForm({
        email_or_username: "",
        password: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error en el inicio de sesión");
      }
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button 
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.subtitle}>Inicia sesión con tu cuenta de <strong>XXXX</strong></p>
        
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Usuario o Correo electrónico</label>
            <input
              className={styles.input}
              type="text"
              name="email_or_username"
              required
              value={form.email_or_username}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.inputGroup}  style={{ position: "relative" }}>
            <label className={styles.label}>Contraseña</label>
            <input
              className={styles.input}
              type= {showPassword ? "text" :"password"}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
             <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#324dd3",
                  fontWeight: "bold",
                  userSelect: "none",
                  padding: 0,
                }}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
          
          <button type="submit" className={styles.submitBtn}>
            Iniciar Sesión
          </button>
        </form>
        
        <p className={styles.signupText}>
          ¿No tienes una cuenta? <a href="http://localhost:4000/register/">Regístrate aquí.</a>
        </p>
      </div>
    </div>
  );
}