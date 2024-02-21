"use server";
import { auth } from "@clerk/nextjs";

export const checkContact = () => {
	const { sessionClaims } = auth();

	return {
		messangerId: sessionClaims?.metadata.messengerId,
		number: sessionClaims?.metadata.number,
	};
};
