/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["github.com", "api.dicebear.com"],
	},
	env: {
		NOTION_API_KEY: process.env.NOTION_API_KEY,
		NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
		NOTION_COMMENT_DATABASE_ID: process.env.NOTION_COMMENT_DATABASE_ID,
		NOTION_OWNER_ID: process.env.NOTION_OWNER_ID,
	},
};

export default nextConfig;
