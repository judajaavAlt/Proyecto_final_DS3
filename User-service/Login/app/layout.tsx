import type { Metadata } from "next";
import "./globals.css";

// Pon esto arriba de tu función
export const metadata: Metadata = {
  title: "Sign in to XXXX",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
