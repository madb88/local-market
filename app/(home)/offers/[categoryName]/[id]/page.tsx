import { checkIfFavorite } from "@/app/api/favorites/offers";
import { getAllOffers, getOffer } from "@/app/api/offers";
import Offer from "@/app/components/pages/Offers/DetailsPage/Offer";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

type PageParams = {
	id: string;
};

export async function generateStaticParams(): Promise<PageParams[]> {
	const offers = await getAllOffers();

	const result = offers?.map((offer) => ({
		id: String(offer.id),
	}));

	return result as PageParams[];
}

export default async function OfferPage({ params }: { params: { id: number } }) {
	revalidateTag("offer");
	revalidateTag("isFavorite");
	const offer = await getOffer(params.id);
	if (!offer) {
		notFound();
	}

	const isFavorite = await checkIfFavorite(offer.id, "user_2bo8FKsaKjOluPm7Ehw79h4WhVW");
	return (
		<>
			<div className="h-screen overflow-auto p-5 md:p-10">
				{offer && <Offer offer={offer} isFavorite={isFavorite} />}
			</div>
		</>
	);
}
