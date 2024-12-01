
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'github.com',
      },
      {
        hostname: 'api.dicebear.com',
      },
      {
        hostname: 'velog.velcdn.com',
      },
      {
        hostname: 'www.notion.so',
      },
    ],
  },
  transpilePackages: ['@repo/ui'],
};

export default nextConfig;
