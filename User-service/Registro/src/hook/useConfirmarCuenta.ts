import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function useConfirmarCuenta() {
  const router = useRouter();
  const [mensaje, setMensaje] = useState("🎬 Verificando tu token...");
  const [confirmado, setConfirmado] = useState<boolean | null>(null);

  useEffect(() => {
    const token = router.query.token as string;

    if (!token) return;

    fetch(`/api/confirmar-cuenta?token=${token}`)
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          setMensaje("🍿 ¡Tu cuenta ha sido confirmada con éxito!");
          setConfirmado(true);
        } else {
          setMensaje(`❌ ${data.detail || "Token inválido o expirado."}`);
          setConfirmado(false);
        }
      })
      .catch(err => {
        setMensaje(`❌ ${err.message}`);
        setConfirmado(false);
      });
  }, [router.query.token]);

  return { mensaje, confirmado, router };
}
