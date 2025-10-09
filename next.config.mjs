/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações do Next.js
  // experimental: Recursos experimentais do Next.js
  experimental: {
    // Permite usar componentes do React 19
    reactCompiler: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // images: Configurações para otimização de imagens
  images: {
    // domains: Lista de domínios permitidos para carregar imagens
    domains: ['placeholder.svg', 'blob.v0.dev'],
    // remotePatterns: Padrões para URLs de imagens externas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
