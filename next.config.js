/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  transpilePackages: ['next-auth'],
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  }
};

module.exports = nextConfig;