import { getAllOffers, getOffer } from "@/app/api/offers";
import Offer from "@/app/components/pages/Offers/DetailsPage/Offer";
import { notFound } from "next/navigation";

// export const dynamic = "force-static";

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

export default async function OfferPage({ params }: { params: { id: string } }) {
	const offer = await getOffer(params.id);

	if (!offer) {
		notFound();
	}

	return (
		<>
			<div className="h-full p-10">{offer && <Offer offer={offer} />}</div>
		</>
	);
}
