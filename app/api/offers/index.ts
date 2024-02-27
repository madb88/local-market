import {
	createSupabaseServerClient,
	createSupabaseServerComponentClient,
} from "@/lib/supabase/serverAppRouter";
import { type PostgrestError } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

export const getAllOffers = async () => {
	const supabase = await createSupabaseServerComponentClient();
	const { data: offers } = await supabase.from("offers").select("id, name, description");

	return offers;
};

export const getOffersByCategory = unstable_cache(
	async (start: number, end: number, categoryName: string) => {
		const supabase = await createSupabaseServerClient({
			shouldBeAuth: false,
			serverComponent: true,
		});
		const { data: offers, count } = await supabase
			.from("offers")
			.select("*", { count: "exact" })
			.match({ status: "accepted", category_name: categoryName })
			.range(start, end)
			.order("created_at", { ascending: false });

		return { offers: offers, count: count };
	},
	["offersByCategory"],
	{ tags: ["offersByCategory"], revalidate: 1 },
);

export const getOffer = unstable_cache(
	async (id: string) => {
		const supabase = await createSupabaseServerClient({ shouldBeAuth: false });
		const { data: offer } = await supabase.from("offers").select().match({ id }).single();

		return offer;
	},
	["offer"],
	{ tags: ["offer"] },
);

export const createOffer = async (
	data: {
		name: string;
		description: string;
		image: string;
		imageObject: {};
		messanger: boolean;
		email: boolean;
		whatsapp: boolean;
		categoryName: string;
		price: number;
	},
	userInfo: {
		firstName: string;
		lastName: string;
		role: string;
		messengerId: string;
		email: string;
	},
	token: string,
): Promise<{ status: number; error: PostgrestError | null; message: string }> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { status, error, statusText } = await supabase.from("offers").insert({
		name: data.name,
		category_name: data.categoryName,
		description: data.description,
		image: data.image,
		image_object: data.imageObject,
		contact_options: { email: data.email, messanger: data.messanger, whatsapp: data.whatsapp },
		author: { userInfo },
		price: data.price,
		status: "pending",
	});

	return { status: status, error: error, message: statusText };
};

export const updateOffer = async (
	id: number,
	data: {
		name: string;
		description: string;
		image: string;
		imageObject: {};
		messanger: boolean;
		email: boolean;
		whatsapp: boolean;
		categoryName: string;
		price: number;
	},
	token: string,
): Promise<{ status: number; error: PostgrestError | null; message: string }> => {
	const supabase = await createSupabaseServerClient({
		shouldBeAuth: true,
		token: token,
		serverComponent: true,
	});

	const { status, error, statusText } = await supabase
		.from("offers")
		.update({
			name: data.name,
			description: data.description,
			category_name: data.categoryName,
			contact_options: { email: data.email, messanger: data.messanger, whatsapp: data.whatsapp },
			image: data.image,
			image_object: data.imageObject,
			price: data.price,
		})
		.eq("id", id);

	return { status: status, error: error, message: statusText };
};

export const getUserOffers = unstable_cache(
	async (userId: string) => {
		const supabase = await createSupabaseServerComponentClient();
		const { data: offers } = await supabase.from("offers").select("*").match({ user_id: userId });

		return offers;
	},
	["userOffers"],
	{ tags: ["userOffers"], revalidate: 1 },
);
