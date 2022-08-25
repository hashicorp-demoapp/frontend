/** 
 * @type {import('next').NextConfig} 
 * */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig;