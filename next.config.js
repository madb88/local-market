/** @type {import('next').NextConfig} */
const packageJson = require("./package.json");

const nextConfig = {
	images: {
		remotePatterns: [{ protocol: "https", hostname: "utfs.io", port: "" }],
	},
	env: {
		APP_VERSION: packageJson.version,
	},
	compress: true,
};

module.exports = nextConfig;
