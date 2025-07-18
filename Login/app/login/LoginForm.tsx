"use client";
import React, { useState } from "react";
import styles from "./LoginModal.module.css";
import { loginUser } from "../../services/authService";

export default function LoginModal() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVisible, setIsVisible] = useState(true);

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

    if (!form.email || !form.password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    
    try {
      await loginUser({
        email: form.email,
        password: form.password,
      });
      setSuccess("¡Inicio de sesión exitoso!");
      setForm({
        email: "",
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
    <div className={styles.container}>
      <div className={styles.loginBox}>
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
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Contraseña</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
          
          <button type="submit" className={styles.submitBtn}>
            Iniciar Sesión
          </button>
        </form>
        
        <p className={styles.signupText}>
          ¿No tienes una cuenta? <a href="http://localhost:3000">Regístrate aquí.</a>
        </p>
      </div>
    </div>
  );
}