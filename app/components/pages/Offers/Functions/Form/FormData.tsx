import { type OfferType } from "@/lib/supabase/serverAppRouter";

type UserContactInfoType = {
	messengerId: string;
	number: string;
	email: string;
};

export type FormData = {
	categoryName: string;
	data?: OfferType;
	userContactInfo?: UserContactInfoType;
};
