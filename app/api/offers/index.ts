import {
	createSupabaseServerClient,
	createSupabaseServerComponentClient,
} from "@/lib/supabase/serverAppRouter";
import { unstable_cache } from "next/cache";

export const getAllOffers = async () => {
	const supabase = await createSupabaseServerComponentClient();
	const { data: offers } = await supabase.from("offers").select("id, name, description");

	return offers;
};

export const getOffersByCategory = unstable_cache(
	async (start: number, end: number, categoryName: string) => {
		const supabase = await createSupabaseServerClient({
			shouldBeAuth: false,
			serverComponent: true,
		});
		const { data: offers, count } = await supabase
			.from("offers")
			.select("*", { count: "exact" })
			.match({ status: "accepted", category_name: categoryName })
			.range(start, end);

		return { offers: offers, count: count };
	},
	["offersByCategory"],
	{ tags: ["offersByCategory"], revalidate: 1 },
);

export const getOffer = unstable_cache(
	async (id: string) => {
		const supabase = await createSupabaseServerClient({ shouldBeAuth: false });
		const { data: offer } = await supabase.from("offers").select().match({ id }).single();

		return offer;
	},
	["offer"],
	{ tags: ["offer"] },
);
