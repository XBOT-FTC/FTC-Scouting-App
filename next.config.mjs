/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/FTC-Scouting-App",
    assetPrefix: '/FTC-Scouting-App/',
    output: "export",
    //strict mode rerenders twice, which slows down the performance.
    // reactStrictMode: true,
    images: {
        unoptimized: true
    }
};

export default nextConfig;
