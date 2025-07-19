"use client";
import React, { useState } from "react";
import styles from "./RegisterModal.module.css";
import { useRegisterForm } from "@/hook/UseRegisterUser";
import Image from "next/image";

export default function RegisterModal() {
  const { form, error, success ,handleChange, handleSubmit } = useRegisterForm();

  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

          {/* Contraseña con botón para mostrar/ocultar */}
          <div style={{ position: "relative" }}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Crea una contraseña"
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
                userSelect: "none"
              }}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirmar contraseña con botón para mostrar/ocultar */}
          <div style={{ position: "relative", marginTop: "16px" }}>
            <input
              className={styles.input}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              required
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                userSelect: "none"
              }}
              aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className={styles.recaptchaBox}>
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
            <div className={styles.recaptchaImg}>
              <Image
                src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                alt="reCAPTCHA"
                width={38}
                height={38}
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
          ¿Ya tienes una cuenta? <a href={process.env.NEXT_PUBLIC_LOGIN_URL}>Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}
