"use server";

import { removeCompanyFromFavorite } from "@/app/api/favorites/companies";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";

export async function deleteCompanyFromFavoriteAction(values: {
	id: number;
	user_id: string;
}): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken } = auth();
	const token = await getToken({ template: String(process.env.JWT_SUPABASE_TEMPLATE) });
	revalidateTag("companies");
	if (token) {
		const { error, message } = await removeCompanyFromFavorite(values, token);
		return { message, error };
	}

	return { message: "Not authorized", error: null };
}
