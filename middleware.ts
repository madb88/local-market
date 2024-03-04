import { authMiddleware } from "@clerk/nextjs";

// eslint-disable-next-line import/no-default-export
export default authMiddleware({
	publicRoutes: [
		"/",
		"/companies",
		"/companies/(.*)",
		"/offers/(.*)",
		"/offers",
		"/offers/dom",
		"/offers/dom/(.*)",
		"/offers/elektronika",
		"/offers/elektronika/(.*)",
		"/offers/ogrod",
		"/offers/ogrod/(.*)",
		"/api/uploadthing",
		"/listing",
		"/listing/(.*)",
	],
	ignoredRoutes: ["/api/uploadthing"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
