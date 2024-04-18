import { searchFunction } from "@/app/api/search";
import OfferList from "@/app/components/pages/Offers/OfferList";
import OffersHeader from "@/app/components/pages/Offers/OffersHeader";
import { Pagination } from "@/app/components/ui/molecules/Pagination";
import { categoriesWithKeys } from "@/app/utils/categoriesData";
import { Card, CardBody } from "@nextui-org/react";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 1;
export default async function ListingPage({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	const page = searchParams["page"] ?? "1";
	const per_page = searchParams["per_page"] ?? "10";
	const start = (Number(page) - 1) * Number(per_page);
	const end = start - 1 + Number(per_page);

	const { data, count } = await searchFunction(
		start,
		end,
		searchParams.filter,
		searchParams.searchKeyWord,
	);

	return (
		<Suspense fallback={<Loading />}>
			{searchParams.searchKeyWord && (
				<div className="px-2 pt-2 md:px-5">
					<Card>
						<CardBody className="">
							<section className="flex gap-2">
								<h1 className="pl-5 text-large">{`Szukasz`}</h1>
								<span className="bg-gradient-to-r from-blue-700 via-indigo-500 to-blue-600 bg-clip-text  text-large text-transparent">
									{searchParams.searchKeyWord}
									{` w ${categoriesWithKeys[searchParams.filter].label}`}
								</span>
							</section>
						</CardBody>
					</Card>
				</div>
			)}
			<OffersHeader />
			{data ? <OfferList offers={data} name={searchParams.filter} /> : "Brak Ofert"}
			{count ? (
				<div className="flex justify-center pb-10 pt-10 ">
					<Pagination
						hasNextPage={end < count}
						hasPrevPage={start > 0}
						currentPage={page}
						perPage={per_page}
						count={count}
						url={`listing?searchKeyWord=${searchParams.searchKeyWord}&filter=${searchParams.filter}&`}
					/>
				</div>
			) : null}
		</Suspense>
	);
}
