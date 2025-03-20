import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  outputFileTracingIncludes: {
    registry: ['./delta/**/*'],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

export default nextConfig;
