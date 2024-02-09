"use server";

import { createCompany } from "@/api/companies";
import { auth } from "@clerk/nextjs";

export async function createCompanyAction(values: { name: string; description: string }) {
	const { getToken } = auth();
	const token = await getToken({ template: "supabase" });

	if (token) {
		await createCompany(values, token);
	}
}
