import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["wits-metadata.s3.us-east-2.amazonaws.com"],
  },
  /* config options here */
  webpack(config) {
    // Configure SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
