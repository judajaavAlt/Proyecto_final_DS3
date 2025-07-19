import { useConfirmarCuenta } from "../hook/useConfirmarCuenta";
import styles from "./ConfirmarCuenta.module.css";

export default function ConfirmarCuenta() {
  const { mensaje, confirmado, router } = useConfirmarCuenta();

  let messageClass = styles.messageDefault;
  if (confirmado === true) messageClass = styles.messageConfirmado;
  if (confirmado === false) messageClass = styles.messageError;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          🎥 Confirmación de cuenta
        </h1>
        <div className={`${styles.message} ${messageClass}`}>
          {confirmado === true && (
            <span className={styles.icon}>✅</span>
          )}
          {confirmado === false && (
            <span className={styles.icon}>❌</span>
          )}
          {mensaje}
        </div>
        {confirmado !== null && (
          <button
            className={styles.button}
            onClick={() => router.push("/login")}
          >
            Ir al login 🍿
          </button>
        )}
      </div>
      <footer className={styles.footer}>
        Proyecto Final DS3 • CineManía 🎬
      </footer>
    </div>
  );
}
