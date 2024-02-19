import { createSupabaseServerClient } from "@/lib/supabase/serverAppRouter";
import { unstable_cache } from "next/cache";

export const getAllOffers = unstable_cache(
	async (start: number, end: number) => {
		const supabase = await createSupabaseServerClient({
			shouldBeAuth: false,
			serverComponent: true,
		});
		const { data: offers, count } = await supabase
			.from("offers")
			.select("*", { count: "exact" })
			.match({ status: "accepted" })
			.range(start, end);
		return { offers: offers, count: count };
	},
	["offers"],
	{ tags: ["offers"], revalidate: 1 },
);

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
