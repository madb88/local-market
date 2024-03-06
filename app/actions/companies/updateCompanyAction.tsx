"use server";

import { updateCompany } from "@/app/api/companies";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";
import { type UploadFileResponse } from "uploadthing/client";

export async function updateCompanyAction(
	id: number,
	values: {
		name: string;
		description: string;
		images: string;
		imageObject: UploadFileResponse<{
			uploadedFile: string;
		}>[];
	},
): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken } = auth();
	const token = await getToken({ template: String(process.env.JWT_SUPABASE_TEMPLATE) });
	revalidateTag("companies");
	if (token) {
		const { error, message } = await updateCompany(id, values, token);
		return { message, error };
	}

	return { message: "Not authorized", error: null };
}
