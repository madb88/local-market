import { type ImageObject } from "@/lib/supabase/additionalTypes";
import {
	createSupabaseServerClient,
	createSupabaseServerComponentClient,
	type OfferType,
} from "@/lib/supabase/serverAppRouter";
import { utapi } from "@/lib/uploadApi";
import { type PostgrestError } from "@supabase/supabase-js";
import { addDays, format } from "date-fns";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

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
			.range(start, end - 1)
			.order("created_at", { ascending: false });

		return { offers: offers, count: count };
	},
	["offersByCategory"],
	{ tags: ["offersByCategory"], revalidate: 1 },
);

export const getOffer = unstable_cache(
	async (id: number) => {
		const supabase = await createSupabaseServerClient({ shouldBeAuth: false });
		const { data: offer } = await supabase.from("offers").select().match({ id }).single();

		return offer;
	},
	["offer"],
	{ tags: ["offer"], revalidate: 1 },
);

export const createOffer = async (
	data: {
		name: string;
		description: string;
		image: string;
		imageObject: ImageObject;
		messanger: boolean;
		email: boolean;
		whatsapp: boolean;
		categoryName: string;
		price: number;
		expired_at: string;
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

	const expiredAt = addDays(new Date(), Number(data.expired_at)).toDateString();

	const { status, error, statusText } = await supabase.from("offers").insert({
		name: data.name,
		category_name: data.categoryName,
		description: data.description,
		image: data.image,
		image_object: data.imageObject,
		contact_options: { email: data.email, messanger: data.messanger, whatsapp: data.whatsapp },
		author: { userInfo },
		price: data.price,
		status: "accepted",
		expired_at: expiredAt,
	});

	return { status: status, error: error, message: statusText };
};

export const updateOffer = async (
	id: number,
	data: {
		name: string;
		description: string;
		image: string;
		imageObject: ImageObject;
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

export const getUserFavoriteOffers = unstable_cache(
	async (userId: string) => {
		const supabase = await createSupabaseServerComponentClient();
		const { data: favoriteOffers, error } = await supabase
			.from("favorite_offers")
			.select("id, offers(*)")
			.match({ user_id: userId });
		if (error) throw error;

		const newData = favoriteOffers.map((element) => element.offers !== null && element.offers);

		return newData as OfferType[];
	},
	["userFavoriteOffers"],
	{
		tags: ["userFavoriteOffers"],
		revalidate: 1,
	},
);

export const getLastOffers = unstable_cache(
	async () => {
		const supabase = await createSupabaseServerComponentClient();
		const { data: lastOffers, error } = await supabase
			.from("offers")
			.select("*")
			.order("created_at", { ascending: false })
			.limit(5);

		if (error) throw error;

		return lastOffers;
	},
	["lastOffers"],
	{ tags: ["lastOffers"], revalidate: 1 },
);

export const setOfferForDelete = async (
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
		.from("offers")
		.update({
			status: data.status,
		})
		.eq("id", id);

	revalidateTag("userOffers");
	revalidatePath("dashboard/offers");

	if (!error && data.image) {
		const { success } = await utapi.deleteFiles(data.image);
		console.log(success);
	}

	return { status: status, error: error, message: statusText };
};

export const deleteOffer = async (
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
		.from("offers")
		.delete()
		.eq("status", "delete");

	return { status: status, error: error, message: statusText };
};

export const deleteExpiredOffer = async (
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
		.from("offers")
		.delete()
		.lt("expired_at", format(new Date(), "yyyy-MM-dd"));

	console.log(status, error, statusText, format(new Date(), "yyyy-MM-dd"));
	return { status: status, error: error, message: statusText };
};
