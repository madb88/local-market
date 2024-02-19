import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/companies",
		"/companies/(.*)",
		"/offers/dom",
		"/offers/elektronika",
		"/offers/ogrod",
		"/api/uploadthing",
	],
	ignoredRoutes: ["/api/uploadthing"],
});

export const config = {
	matcher: ["/", "/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
