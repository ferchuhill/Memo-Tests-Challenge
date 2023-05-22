/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  excludeFile: (str) =>
    /\*.{spec,test}.js/.test(str) || str.includes('stories.tsx'),
};

module.exports = nextConfig;
