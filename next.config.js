/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
    ],
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/products',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
