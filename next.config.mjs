/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'rickandmortyapi.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
