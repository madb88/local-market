import { getLastOffers } from "@/app/api/offers";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import OffersCarousel from "../OffersCarousel";

export default async function LastOffers() {
	const lastOffers = await getLastOffers();

	return (
		<div>
			<Card>
				<CardHeader>
					<h1 className="px-5 text-base">Najnowsze oferty:</h1>
				</CardHeader>
				<CardBody className="w-full pb-10 pt-10 md:px-20">
					{lastOffers ? <OffersCarousel data={lastOffers} /> : "Brak ofert"}
				</CardBody>
			</Card>
		</div>
	);
}
