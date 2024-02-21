import { type OfferType } from "@/lib/supabase/serverAppRouter";

export type FormData = {
	categoryName: string;
	data?: OfferType;
};
