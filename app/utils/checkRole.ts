import { type Roles } from "@/app/types/global";
import { auth } from "@clerk/nextjs";
import { includes } from "ramda";

export const checkRole = (role?: Roles) => {
	const allowedAuthorized = ["admin", "authorizedUser"];

	const { sessionClaims } = auth();

	return includes(sessionClaims?.metadata.role, allowedAuthorized);

	// return sessionClaims?.metadata.role === role;
};
