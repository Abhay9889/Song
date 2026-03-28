/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'usercontent.jamendo.com' },
      { protocol: 'https', hostname: 'imgjam1.jamendo.com' },
      { protocol: 'https', hostname: 'imgjam2.jamendo.com' },
      { protocol: 'https', hostname: 'imgjam3.jamendo.com' },
      { protocol: 'https', hostname: '*.jamendo.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  transpilePackages: ['three'],
};
module.exports = nextConfig;
