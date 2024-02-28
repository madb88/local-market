"use server";

import { addOfferToFavorite } from "@/app/api/favorites/offers";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";

export async function addOfferToFavoriteAction(values: {
	id: number;
}): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken } = auth();
	const token = await getToken({ template: process.env.JWT_SUPABASE_TEMPLATE });
	revalidateTag("companies");
	if (token) {
		const { error, message } = await addOfferToFavorite(values, token);
		console.log(error);
		return { message, error };
	}

	return { message: "Not authorized", error: null };
}
