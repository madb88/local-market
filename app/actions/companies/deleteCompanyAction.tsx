"use server";

import { setCompanyForDelete } from "@/app/api/companies";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidatePath, revalidateTag } from "next/cache";

export async function setCompanyForDeleteAction(
	id: number,
	values: {
		status: string;
		image: string;
	},
): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken } = auth();
	const token = await getToken({ template: String(process.env.JWT_SUPABASE_TEMPLATE) });

	if (token) {
		const { error, message } = await setCompanyForDelete(id, values, token);
		return { message, error };
	}
	revalidateTag("userCompanies");
	revalidatePath("dashboard/companies");
	return { message: "Not authorized", error: null };
}
