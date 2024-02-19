import { OfferType } from "@/lib/supabase/serverAppRouter";

export type CategoryListT = {
	name: string;
	offers: OfferType[];
};
