import { checkIfFavorite } from "@/app/api/favorites/offers";
import { getOffer } from "@/app/api/offers";
import Offer from "@/app/components/pages/Offers/DetailsPage/Offer";
import { currentUser } from "@clerk/nextjs";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
	params: { id: number };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.id;

	const offer = await getOffer(id);

	return {
		title: offer?.name,
		description: offer?.description,
		openGraph: {
			images: [`${offer?.image}`],
		},
	};
}

export default async function OfferPage({ params }: { params: { id: number } }) {
	const user = await currentUser();

	const offer = await getOffer(params.id);
	if (!offer) {
		notFound();
	}

	const isFavorite = user ? await checkIfFavorite(offer.id, user.id) : false;
	return (
		<>
			<div className="h-screen overflow-auto p-5 md:p-10">
				{offer && <Offer offer={offer} isFavorite={isFavorite} />}
			</div>
		</>
	);
}
