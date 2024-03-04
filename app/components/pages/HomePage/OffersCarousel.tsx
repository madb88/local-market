"use client";

import { type OfferType } from "@/lib/supabase/serverAppRouter";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../../ui/atoms/carousel";
import LastOfferItem from "./LastOffers/LastOfferItem";

export default function OffersCarousel({ data }: { data: OfferType[] | [] }) {
	return (
		<Carousel
			opts={{
				align: "start",
			}}
			className="w-full"
		>
			<CarouselPrevious />
			<CarouselContent className="px-2 pb-2 pl-2 pt-2">
				{data &&
					data.map((offer) => {
						return (
							<CarouselItem
								key={`${offer.id}_${offer.name}`}
								className=" md:basis-1/2 lg:basis-1/3"
							>
								<LastOfferItem offer={offer} />
							</CarouselItem>
						);
					})}
			</CarouselContent>
			<CarouselNext />
		</Carousel>
	);
}
