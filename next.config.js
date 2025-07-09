import "./src/env.js";
import path from "path";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["images.unsplash.com"],
  },
  typescript: {
    // ⚠️ Dangerously allow production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Add path alias for ~ to src
    config.resolve.alias['~'] = path.resolve(process.cwd(), 'src');
    
    // Fix for client-side issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
};

export default config;
