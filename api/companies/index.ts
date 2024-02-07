import { unstable_cache } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/serverAppRouter";

export const getCompanies = unstable_cache(
	async (start: number, end: number) => {
		const supabase = await createSupabaseServerClient(false);
		const { data: companies, count } = await supabase
			.from("companies")
			.select("*", { count: "exact" })
			.range(start, end);
		return { companies: companies, count: count };
	},
	["companies"],
	{ tags: ["companies"] },
);
