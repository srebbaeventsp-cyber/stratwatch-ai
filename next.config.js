/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // Désactive le minifieur Rust
  experimental: {
    forceSwcTransforms: false, // Force l'usage de Babel
  },
  // Sécurité mémoire pour le build
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
