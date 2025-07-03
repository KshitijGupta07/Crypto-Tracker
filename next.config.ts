// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.coingecko.com'], // ✅ Add this domain for crypto coin images
  },
};

module.exports = nextConfig;
