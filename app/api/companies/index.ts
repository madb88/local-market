import {
	createSupabaseServerClient,
	createSupabaseServerComponentClient,
} from "@/lib/supabase/serverAppRouter";
import { type PostgrestError } from "@supabase/supabase-js";
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
			.match({ status: "accepted" })
			.range(start, end);
		return { companies: companies, count: count };
	},
	["companies"],
	{ tags: ["companies"], revalidate: 1 },
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
	{ tags: ["company"] },
);

export const createCompany = async (
	data: { name: string; description: string; images: string },
	token: string,
): Promise<{ status: number; error: PostgrestError | null; message: string }> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});
	console.log(data);
	const { status, error, statusText } = await supabase
		.from("companies")
		.insert({ name: data.name, description: data.description, images: data.images });

	return { status: status, error: error, message: statusText };
};
