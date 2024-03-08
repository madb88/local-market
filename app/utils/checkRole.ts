import { auth } from "@clerk/nextjs";
import { includes } from "ramda";

export type Roles = "admin" | "modeauthorizedUserrator";

export const checkRole = () => {
	const allowedAuthorized = ["admin", "authorizedUser"];

	const { sessionClaims } = auth();

	return includes(sessionClaims?.metadata.role, allowedAuthorized);

	// return sessionClaims?.metadata.role === role;
};

export const checkRoleClient = (role: string) => {
	const allowedAuthorized = ["admin", "authorizedUser"];

	return includes(role, allowedAuthorized);
};

export const checkSpecificRole = (role: Roles) => {
	const { sessionClaims } = auth();

	return sessionClaims?.metadata.role === role;
};

export const checkIfAdmin = (role: string) => {
	return role === "admin";
};
