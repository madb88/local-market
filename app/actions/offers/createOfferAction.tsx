"use server";

import { createOffer } from "@/app/api/offers";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";
import { type UploadFileResponse } from "uploadthing/client";
import { z } from "zod";

const formSchema = z.object({
	name: z
		.string()
		.min(1, {
			message: "Nazwa musi mieć minimum 1 znak",
		})
		.max(50, {
			message: "Nazwa moze mieć maksymalnie 50 znaków",
		}),
	description: z
		.string()
		.min(1, {
			message: "Opis musi mieć minimum 1 znak",
		})
		.max(300, {
			message: "Opis moze mieć maksymalnie 300 znaków",
		}),
	image: z.string(),
	messanger: z.boolean(),
	whatsapp: z.boolean(),
	email: z.boolean(),
	categoryName: z.string().min(1, { message: "To pole jest wymagane" }),
	price: z.number(),
	expired_at: z.string().min(1, { message: "To pole jest wymagane" }),
});

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
	price: number;
	expired_at: string;
}): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken, sessionClaims } = auth();
	const token = await getToken({ template: String(process.env.JWT_SUPABASE_TEMPLATE) });

	const parseResult = formSchema.safeParse(values);

	const userInfo = {
		firstName: sessionClaims && sessionClaims.firstName ? sessionClaims.firstName : "",
		lastName: sessionClaims && sessionClaims.lastName ? sessionClaims.lastName : "",
		role: sessionClaims && sessionClaims.metadata.role ? sessionClaims.metadata.role : "",
		messengerId:
			sessionClaims && sessionClaims.metadata.messengerId ? sessionClaims.metadata.messengerId : "",
		email: sessionClaims && sessionClaims.email ? sessionClaims.email : "",
		number: sessionClaims && sessionClaims.metadata.number ? sessionClaims.metadata.number : "",
	};

	revalidateTag("offers");
	revalidateTag("lastOffers");

	if (parseResult.success === false) {
		return { message: "Validation issue", error: null };
	}

	if (token) {
		const { error, message } = await createOffer(values, userInfo, token);
		return { message, error };
	}

	return { message: "Not authorized", error: null };
}
