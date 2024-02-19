"use server";
import { auth } from "@clerk/nextjs";

export const checkIfMessangerAvailable = () => {
	const { sessionClaims } = auth();

	return { messangerId: sessionClaims?.metadata.messangerId };
};
