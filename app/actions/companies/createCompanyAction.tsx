"use server";

import { createCompany } from "@/app/api/companies";
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
	images: z.string(),
});

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
	const parseResult = formSchema.safeParse(values);

	revalidateTag("companies");
	revalidateTag("lastCompanies");

	if (parseResult.success === false) {
		return { message: "Validation issue", error: null };
	}

	if (token) {
		const { error, message } = await createCompany(values, token);
		return { message, error };
	}

	return { message: "Not authorized", error: null };
}
