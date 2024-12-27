/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true
    },
    // Ensure trailing slashes are handled
    trailingSlash: true,
    // Disable image optimization
    images: {
      unoptimized: true,
    },
  }
  
  module.exports = nextConfig