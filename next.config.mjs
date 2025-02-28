/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'rickandmortyapi.com',
        protocol: 'https',
        // pathname: '/api/character',
      }
    ],
  }
}

export default nextConfig;
