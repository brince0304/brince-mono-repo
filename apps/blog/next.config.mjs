/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["github.com", "api.dicebear.com"],
	},
	transpilePackages: [
		"@brince-mono-repo/shared-components",
		"@brince-mono-repo/shared-styles",
	],
};

export default nextConfig;
