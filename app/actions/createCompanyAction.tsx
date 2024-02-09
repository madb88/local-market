"use server";

import { createCompany } from "@/api/companies";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";

export async function createCompanyAction(values: {
	name: string;
	description: string;
}): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken } = auth();
	const token = await getToken({ template: "supabase" });

	if (token) {
		const { error, message } = await createCompany(values, token);
		return { message, error };
	}

	return { message: "Not authorized", error: null };
}
