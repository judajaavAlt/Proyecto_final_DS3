import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.pinimg.com"], // <-- Configuración correcta aquí
  },
  // exports: { ... } <-- Esto es para otra configuración
};

export default nextConfig;
