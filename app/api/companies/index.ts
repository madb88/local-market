import { type ImageObject } from "@/lib/supabase/additionalTypes";
import {
	createSupabaseServerClient,
	createSupabaseServerComponentClient,
	type CompanyType,
} from "@/lib/supabase/serverAppRouter";
import { utapi } from "@/lib/uploadApi";
import { type PostgrestError } from "@supabase/supabase-js";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export const getCompanies = unstable_cache(
	async (start: number, end: number) => {
		const supabase = await createSupabaseServerClient({
			shouldBeAuth: false,
			serverComponent: true,
		});
		const { data: companies, count } = await supabase
			.from("companies")
			.select("*", { count: "exact" })
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
	data: { name: string; description: string; images: string; imageObject: ImageObject },
	token: string,
): Promise<{ status: number; error: PostgrestError | null; message: string }> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { status, error, statusText } = await supabase.from("companies").insert({
		name: data.name,
		description: data.description,
		images: data.images,
		image_object: data.imageObject,
		status: "accepted",
	});

	return { status: status, error: error, message: statusText };
};

export const updateCompany = async (
	id: number,
	data: { name: string; description: string; images: string; imageObject: ImageObject },
	token: string,
): Promise<{ status: number; error: PostgrestError | null; message: string }> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { status, error, statusText } = await supabase
		.from("companies")
		.update({
			name: data.name,
			description: data.description,
			images: data.images,
			image_object: data.imageObject,
		})
		.eq("id", id);

	return { status: status, error: error, message: statusText };
};

export const getUserCompanies = unstable_cache(
	async (userId: string) => {
		const supabase = await createSupabaseServerComponentClient();
		const { data: offers } = await supabase
			.from("companies")
			.select("*")
			.match({ user_id: userId });

		return offers;
	},
	["userCompanies"],
	{ tags: ["userCompanies"], revalidate: 1 },
);

export const getUserFavoriteCompanies = unstable_cache(
	async (userId: string) => {
		const supabase = await createSupabaseServerComponentClient();
		const { data: favoriteCompanies, error } = await supabase
			.from("favorite_companies")
			.select("id, companies(*)")
			.match({ user_id: userId });

		if (error) throw error;

		const newData = favoriteCompanies.map(
			(element) => element.companies !== null && element.companies,
		);

		return newData as unknown as CompanyType[];
	},
	["userFavoriteCompanies"],
	{
		tags: ["userFavoriteCompanies"],
		revalidate: 1,
	},
);

export const setCompanyForDelete = async (
	id: number,
	data: {
		status: string;
		image: string;
	},
	token: string,
): Promise<{ status: number; error: PostgrestError | null; message: string }> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { status, error, statusText } = await supabase
		.from("companies")
		.update({
			status: data.status,
		})
		.eq("id", id);

	revalidateTag("userCompanies");
	revalidatePath("dashboard/companies");

	if (!error && data.image) {
		await utapi.deleteFiles(data.image);
	}

	return { status: status, error: error, message: statusText };
};

export const deleteCompany = async (
	token: string,
): Promise<{
	status: number;
	error: PostgrestError | null;
	message: string;
}> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { status, error, statusText } = await supabase
		.from("companies")
		.delete()
		.eq("status", "delete");

	return { status: status, error: error, message: statusText };
};
