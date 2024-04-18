import { createSupabaseServerComponentClient } from "@/lib/supabase/serverAppRouter";
import { includes } from "ramda";

export const searchFunction = async (
	start: number,
	end: number,
	categoryName: string,
	searchWord: string,
) => {
	const table: { tableName?: string } = {};

	if (includes(categoryName, ["elektronika", "ogrod", "dom", "all", "wlasne-wyroby"])) {
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

	const supabase = await createSupabaseServerComponentClient();
	const { data: elements, count } = await supabase
		.from(table.tableName)
		.select("*", { count: "exact" })
		.match(matchFilter)
		.or(`name.ilike.%${searchWord.trim()}%, description.ilike.%${searchWord.trim()}%`)
		.range(start, end);
	console.log(searchWord.trim());
	console.log(elements);
	return { data: elements, count: count };
};
