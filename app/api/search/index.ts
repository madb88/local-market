import { createSupabaseServerClient } from "@/lib/supabase/serverAppRouter";
import { unstable_cache } from "next/cache";
import { includes } from "ramda";

export const searchFunction = unstable_cache(
	async (start: number, end: number, categoryName: string, searchWord: string) => {
		const table: { tableName?: string } = {};

		if (includes(categoryName, ["elektronika", "ogrod", "dom", "all"])) {
			table.tableName = "offers";
		} else {
			table.tableName = "companies";
		}

		const matchFilter: { status: string; category_name?: string } = {
			status: "accepted",
		};

		if (!includes(categoryName, ["all", "company"])) {
			matchFilter.category_name = categoryName;
		}

		const supabase = await createSupabaseServerClient({
			shouldBeAuth: false,
			serverComponent: true,
		});

		const { data: elements, count } = await supabase
			.from(table.tableName)
			.select("*", { count: "exact" })
			.match(matchFilter)
			.textSearch("name_description", searchWord, { type: "websearch" })
			.range(start, end);

		return { data: elements, count: count };
	},
	["offersByCategoryLike"],
	{ tags: ["offersByCategoryLike"], revalidate: 1 },
);