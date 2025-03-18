import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./delta/**/*"],
  },
  /* config options here */
};

export default nextConfig;
