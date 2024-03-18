import {
	createSupabaseServerClient,
	createSupabaseServerComponentClient,
} from "@/lib/supabase/serverAppRouter";
import { type PostgrestError } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const addCompanyToFavorite = async (
	data: { id: number },
	token: string,
): Promise<{ status: number; error: PostgrestError | null; message: string }> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { status, error, statusText } = await supabase.from("favorite_companies").insert({
		company_id: data.id,
	});

	return { status: status, error: error, message: statusText };
};

export const removeCompanyFromFavorite = async (
	data: { id: number; user_id: string },
	token: string,
): Promise<{ status: number; error: PostgrestError | null; message: string }> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { status, error, statusText } = await supabase
		.from("favorite_companies")
		.delete({})
		.match({ company_id: data.id, user_id: data.user_id });

	return { status: status, error: error, message: statusText };
};

export const checkIfCompanyIsFavorite = unstable_cache(
	async (id: number, user_id: string) => {
		const supabase = await createSupabaseServerComponentClient();
		const { data: favoriteCompany } = await supabase
			.from("favorite_companies")
			.select("*")
			.match({ company_id: id, user_id: user_id });

		return favoriteCompany ? (favoriteCompany?.length > 0 ? true : false) : false;
	},
	[`isFavorite`],
	{ tags: ["isFavorite"], revalidate: 1 },
);
