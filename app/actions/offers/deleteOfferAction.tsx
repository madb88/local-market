"use server";

import { setOfferForDelete } from "@/app/api/offers";
import { auth } from "@clerk/nextjs";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidatePath, revalidateTag } from "next/cache";

export async function setOfferForDeleteAction(
	id: number,
	values: {
		status: string;
		image: string;
	},
): Promise<{ message: string; error: PostgrestError | null }> {
	const { getToken } = auth();
	const token = await getToken({ template: String(process.env.JWT_SUPABASE_TEMPLATE) });

	if (token) {
		const { error, message } = await setOfferForDelete(id, values, token);
		return { message, error };
	}
	revalidateTag("userOffers");
	revalidatePath("dashboard/offers");
	return { message: "Not authorized", error: null };
}
