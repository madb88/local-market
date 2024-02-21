"use server";

import { createOffer } from "@/app/api/offers";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";
import { type UploadFileResponse } from "uploadthing/client";

export async function createOfferAction(values: {
	name: string;
	description: string;
	categoryName: string;
	image: string;
	messanger: boolean;
	whatsapp: boolean;
	email: boolean;
	imageObject: UploadFileResponse<{
		uploadedFile: string;
	}>[];
}): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken, sessionClaims } = auth();
	const token = await getToken({ template: "supabase" });

	const userInfo = {
		firstName: sessionClaims && sessionClaims.firstName ? sessionClaims.firstName : "",
		lastName: sessionClaims && sessionClaims.lastName ? sessionClaims.lastName : "",
		role:
			sessionClaims && sessionClaims.metadata.role ? (sessionClaims.metadata.role as string) : "",
		messengerId:
			sessionClaims && sessionClaims.metadata.messengerId
				? (sessionClaims.metadata.messengerId as string)
				: "",
		email: sessionClaims && sessionClaims.email ? (sessionClaims.email as string) : "",
		number:
			sessionClaims && sessionClaims.metadata.number
				? (sessionClaims.metadata.number as string)
				: "",
	};

	revalidateTag("offers");
	if (token) {
		const { error, message } = await createOffer(values, userInfo, token);
		return { message, error };
	}

	return { message: "Not authorized", error: null };
}
