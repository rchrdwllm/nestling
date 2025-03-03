import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.ts",
      },
    },
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
