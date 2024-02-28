import {
	createSupabaseServerClient,
	createSupabaseServerComponentClient,
} from "@/lib/supabase/serverAppRouter";
import { type PostgrestError } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const addOfferToFavorite = async (
	data: { id: number },
	token: string,
): Promise<{ status: number; error: PostgrestError | null; message: string }> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { status, error, statusText } = await supabase.from("favorite_offers").insert({
		offer_id: data.id,
	});

	return { status: status, error: error, message: statusText };
};

export const removeOfferFromFavorite = async (
	data: { id: number; user_id: string },
	token: string,
): Promise<{ status: number; error: PostgrestError | null; message: string }> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { status, error, statusText } = await supabase
		.from("favorite_offers")
		.delete({})
		.match({ offer_id: data.id, user_id: data.user_id });

	return { status: status, error: error, message: statusText };
};

export const checkIfAddedToFavorite = async (
	data: { id: number; user_id: string },
	token: string,
) => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { data: favoriteOffer } = await supabase
		.from("favorite_offers")
		.select("*")
		.match({ offer_id: data.id, user_id: data.user_id });

	return { data: favoriteOffer };
};

export const checkIfFavorite = unstable_cache(
	async (id: number, user_id: string) => {
		const supabase = await createSupabaseServerComponentClient();
		const { data: favoriteOffer } = await supabase
			.from("favorite_offers")
			.select("*")
			.match({ offer_id: id, user_id: user_id });

		return favoriteOffer ? (favoriteOffer?.length > 0 ? true : false) : false;
	},
	["isFavorite"],
	{ tags: ["isFavorite"], revalidate: 1 },
);
