"use server";

import { createCompany } from "@/app/api/companies";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";
import { type UploadFileResponse } from "uploadthing/client";

export async function createCompanyAction(values: {
	name: string;
	description: string;
	images: string;
	imageObject: UploadFileResponse<{
		uploadedFile: string;
	}>[];
}): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken } = auth();
	const token = await getToken({ template: String(process.env.JWT_SUPABASE_TEMPLATE) });
	revalidateTag("companies");
	revalidateTag("lastCompanies");
	if (token) {
		const { error, message } = await createCompany(values, token);
		return { message, error };
	}

	return { message: "Not authorized", error: null };
}
