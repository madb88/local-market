import { createSupabaseServerClient } from "@/lib/supabase/serverAppRouter";
import { auth } from "@clerk/nextjs";

export default async function Companies() {
	const { userId, getToken } = auth();
	console.log(userId);
	const token = await getToken({ template: "supabase" });
	console.log(token);
	if (token) {
		const supabase = createSupabaseServerClient(token);
		const { data: companies } = await supabase.from("companies").select();
		console.log(companies);
	}
	return <>Companies list</>;
}
