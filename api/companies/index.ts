import { createSupabaseServerClient } from "@/lib/supabase/serverAppRouter";

export default async function getAllCompanies() {
	const supabase = await createSupabaseServerClient(false);
	const { data: companies } = await supabase.from("companies").select();

	return companies;
}
