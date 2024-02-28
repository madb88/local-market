"use server";

import { removeOfferFromFavorite } from "@/app/api/favorites/offers";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";

export async function deleteOfferFromFavoriteAction(values: {
	id: number;
	user_id: string;
}): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken } = auth();
	const token = await getToken({ template: process.env.JWT_SUPABASE_TEMPLATE });
	revalidateTag("companies");
	if (token) {
		const { error, message } = await removeOfferFromFavorite(values, token);
		return { message, error };
	}

	return { message: "Not authorized", error: null };
}
