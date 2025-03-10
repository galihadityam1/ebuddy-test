import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/ebuddy-ee654/asia-southeast1/api/:path*'
      }
    ]
  }
};

export default nextConfig;
