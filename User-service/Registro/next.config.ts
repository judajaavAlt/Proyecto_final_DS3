import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gstatic.com",
      },
    ],
  },
  output: "standalone",

  basePath: "/register",
  trailingSlash: true,
};

export default nextConfig;
