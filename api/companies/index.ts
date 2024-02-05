import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/serverAppRouter";

export const getAllCompanies = cache(async () => {
	const supabase = await createSupabaseServerClient(false);
	const { data: companies } = await supabase.from("companies").select();

	return companies;
});
