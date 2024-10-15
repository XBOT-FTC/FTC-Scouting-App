/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "/FTC-Scouting-App" : "",
  assetPrefix: isProd ? "/FTC-Scouting-App/" : "",
  output: "export",
  // strict mode rerenders twice, which slows down the performance.
  // reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
