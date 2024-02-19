import { auth } from "@clerk/nextjs";
import { includes } from "ramda";

export const checkRole = () => {
	const allowedAuthorized = ["admin", "authorizedUser"];

	const { sessionClaims } = auth();

	return includes(sessionClaims?.metadata.role, allowedAuthorized);

	// return sessionClaims?.metadata.role === role;
};
