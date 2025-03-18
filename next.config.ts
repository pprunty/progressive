import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./astrik/**/*"],
  },
  /* config options here */
};

export default nextConfig;
