/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com', 'api.dicebear.com'],
  },
  env: {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_COMMENT_DATABASE_ID: process.env.NOTION_COMMENT_DATABASE_ID,
    NOTION_OWNER_ID: process.env.NOTION_OWNER_ID,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      console.log('Build-time environment variables:');
      console.log('NOTION_API_KEY:', process.env.NOTION_API_KEY ? 'Set' : 'Not set');
      // 다른 환경 변수들도 필요하다면 여기에 추가
    }
    return config;
  },
};

export default nextConfig;
