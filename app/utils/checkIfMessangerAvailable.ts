"use server";
import { auth } from "@clerk/nextjs";

export const checkContact = () => {
	const { sessionClaims } = auth();

	return {
		messangerId: sessionClaims?.metadata.messangerId,
		number: sessionClaims?.metadata.number,
	};
};
