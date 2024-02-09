import {
	createSupabaseServerClient,
	createSupabaseServerComponentClient,
} from "@/lib/supabase/serverAppRouter";
import { unstable_cache } from "next/cache";

export const getCompanies = unstable_cache(
	async (start: number, end: number) => {
		const supabase = await createSupabaseServerClient({
			shouldBeAuth: false,
			serverComponent: true,
		});
		const { data: companies, count } = await supabase
			.from("companies")
			.select("id, name, description", { count: "exact" })
			.range(start, end);
		return { companies: companies, count: count };
	},
	["companies"],
	{ tags: ["companies"], revalidate: 10 },
);

export const getAllCompanies = async () => {
	const supabase = await createSupabaseServerComponentClient();
	const { data: companies } = await supabase.from("companies").select("id, name, description");

	return companies;
};

export const getCompany = unstable_cache(
	async (id: string) => {
		const supabase = await createSupabaseServerClient({ shouldBeAuth: false });
		const { data: company } = await supabase.from("companies").select().match({ id }).single();

		return company;
	},
	["company"],
	{ tags: ["company"], revalidate: 360 },
);

export const createCompany = async (data: { name: string; description: string }, token: string) => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});
	const { status, error } = await supabase
		.from("companies")
		.insert({ name: data.name, description: data.description });

	console.log(status, error);

	return { status, error };
};
