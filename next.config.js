/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
  },
}

module.exports = nextConfig
