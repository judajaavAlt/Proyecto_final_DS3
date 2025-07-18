"use client";
import React from "react";
import styles from "./RegisterModal.module.css";
import { useRegisterForm } from "@/hook/UseRegisterUser"; // Ajusta el path según tu estructura
import Image from "next/image";

export default function RegisterModal() {
  const { form, error, success ,handleChange, handleSubmit } = useRegisterForm();

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
             <Image
              src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
              alt="reCAPTCHA"
              width={48}
              height={48}
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
        <p className={styles.signin}>
          ¿Ya tienes una cuenta? <a href="#">Inicia sesión aquí.</a>
        </p>
      </div>
    </div>
  );
}
