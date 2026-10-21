import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export', // <--- Yeh line add karein (Static export ke liye)
  images: {
    unoptimized: true, // <--- Yeh line add karein (Images Netlify par show hone ke liye)
  },
};

export default nextConfig;