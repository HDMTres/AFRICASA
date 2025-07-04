/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activer le mode standalone pour Docker
  output: 'standalone',
  
  // Configuration des images
  images: {
    domains: ['localhost', '127.0.0.1'],
  },
  
  // Configuration pour la production
  swcMinify: true,
}

export default nextConfig
