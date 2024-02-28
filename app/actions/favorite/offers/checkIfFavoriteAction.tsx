"use server";

import { checkIfAddedToFavorite } from "@/app/api/favorites/offers";
import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";

export async function checkIfFavoriteAction(values: { id: number; user_id: string }) {
	const { getToken } = auth();
	const token = await getToken({ template: String(process.env.JWT_SUPABASE_TEMPLATE) });
	revalidateTag("companies");
	if (token) {
		const { data } = await checkIfAddedToFavorite(values, token);

		return { data };
	}

	return { message: "Not authorized", error: null };
}
