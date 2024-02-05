import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/serverAppRouter";

export const getCompanies = cache(async (start: number, end: number) => {
	const supabase = await createSupabaseServerClient(false);
	const { data: companies, count } = await supabase
		.from("companies")
		.select("*", { count: "exact" })
		.range(start, end);
	return { companies: companies, count: count };
});
