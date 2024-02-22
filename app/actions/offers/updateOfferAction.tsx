"use server";

import { updateOffer } from "@/app/api/offers";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";
import { type UploadFileResponse } from "uploadthing/client";

export async function updateOfferAction(
	id: number,
	values: {
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
	},
): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken } = auth();
	const token = await getToken({ template: "supabase" });
	revalidateTag("offers");
	if (token) {
		const { error, message } = await updateOffer(id, values, token);
		return { message, error };
	}

	return { message: "Not authorized", error: null };
}
