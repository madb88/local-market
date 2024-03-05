/** @type {import('next').NextConfig} */
const packageJson = require("./package.json");
const withMDX = require("@next/mdx")();

const nextConfig = {
	images: {
		remotePatterns: [{ protocol: "https", hostname: "utfs.io", port: "" }],
	},
	env: {
		APP_VERSION: packageJson.version,
	},
	pageExtensions: ["mdx", "ts", "tsx"],

	compress: true,
};

module.exports = withMDX(nextConfig);
