import { type OfferType } from "@/lib/supabase/serverAppRouter";

export type OfferListT = {
	name: string;
	offers: OfferType[];
};
