"use client";

import { type CompanyType } from "@/lib/supabase/serverAppRouter";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../../ui/atoms/carousel";
import LastCompanyItem from "./LastCompanies/LastCompanyItem";

export default function CompaniesCarousel({ data }: { data: CompanyType[] | [] }) {
	return (
		<Carousel
			opts={{
				align: "start",
			}}
			className="w-full"
		>
			<CarouselPrevious />
			<CarouselContent className="h-fit px-2 pb-2 pl-2 pt-2">
				{data &&
					data.map((company) => {
						return (
							<CarouselItem
								key={`${company.id}_${company.name}`}
								className="md:basis-1/2 lg:basis-1/3"
							>
								<LastCompanyItem company={company} />
							</CarouselItem>
						);
					})}
			</CarouselContent>
			<CarouselNext />
		</Carousel>
	);
}
