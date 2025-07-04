/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.placeholder.com'],
    unoptimized: true
  },
  trailingSlash: true,
  output: 'export',
  distDir: 'out'
}

module.exports = nextConfig 