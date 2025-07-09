/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Remove output: 'export' to enable API routes
  // output: 'export' // Comment this out for API routes to work
}

module.exports = nextConfig 