import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/companies",
		"/companies/(.*)",
		"/categories/dom",
		"/categories/elektronika",
		"/categories/ogrod",
		"/api/uploadthing",
	],
	ignoredRoutes: ["/api/uploadthing"],
});

export const config = {
	matcher: ["/", "/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
