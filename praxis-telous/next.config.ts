import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/praxis-telous',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
