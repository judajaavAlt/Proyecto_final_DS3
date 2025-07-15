import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ConfirmarCuenta() {
  const router = useRouter();
  const [mensaje, setMensaje] = useState("🎬 Verificando tu token...");
  const [confirmado, setConfirmado] = useState<boolean | null>(null);

  useEffect(() => {
    const token = router.query.token as string;

    if (!token) return;

    fetch(`http://localhost:8000/saga/confirmar?token=${token}`)
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Token inválido o expirado.");
      })
      .then(() => {
        setMensaje("🍿 ¡Tu cuenta ha sido confirmada con éxito!");
        setConfirmado(true);
      })
      .catch(err => {
        setMensaje(`❌ ${err.message}`);
        setConfirmado(false);
      });
  }, [router.query.token]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Roboto', 'Montserrat', sans-serif"
    }}>
      <div style={{
        background: "rgba(34, 40, 49, 0.95)",
        padding: "40px 50px",
        borderRadius: "18px",
        boxShadow: "0 10px 28px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)",
        textAlign: "center",
        border: "3px solid #f5c518" // color dorado tipo IMDb
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          marginBottom: "30px",
          color: "#f5c518",
          fontFamily: "'Bebas Neue', 'Montserrat', sans-serif",
          textShadow: "2px 2px 6px #000"
        }}>
          🎥 Confirmación de cuenta
        </h1>
        <div style={{
          fontSize: "1.4rem",
          marginBottom: "25px",
          color: confirmado === true ? "#abff2f" : confirmado === false ? "#f44336" : "#f5c518",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {confirmado === true && (
            <span style={{ marginRight: "8px", fontSize: "1.7rem" }}>✅</span>
          )}
          {confirmado === false && (
            <span style={{ marginRight: "8px", fontSize: "1.7rem" }}>❌</span>
          )}
          {mensaje}
        </div>
        {confirmado !== null && (
          <button
            style={{
              padding: "12px 36px",
              background: "#f5c518",
              color: "#222831",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1.2rem",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
              marginTop: "10px",
              transition: "background 0.2s"
            }}
            onClick={() => router.push("/login")}
          >
            Ir al login 🍿
          </button>
        )}
      </div>
      <footer style={{
        marginTop: "40px",
        color: "#aaa",
        fontSize: "1rem",
        letterSpacing: "2px"
      }}>
        Proyecto Final DS3 • CineManía 🎬
      </footer>
    </div>
  );
}
