import { searchFunction } from "@/app/api/search";
import OfferList from "@/app/components/pages/Offers/OfferList";
import OffersHeader from "@/app/components/pages/Offers/OffersHeader";
import { Pagination } from "@/app/components/ui/molecules/Pagination";
import { Suspense } from "react";
import Loading from "./loading";

export default async function ListingPage({
	searchParams,
}: {
	searchParams: { [key: string]: string };
}) {
	const page = (searchParams["page"] as string) ?? "1";
	const per_page = (searchParams["per_page"] as string) ?? "10";
	const start = (Number(page) - 1) * Number(per_page);
	const end = start - 1 + Number(per_page);

	const { data, count } = await searchFunction(
		start,
		end,
		searchParams.filter as string,
		searchParams.searchKeyWord as string,
	);

	return (
		<Suspense fallback={<Loading />}>
			<h2 className="px-5 pt-2">{`Szukasz ${searchParams.searchKeyWord}`}</h2>
			<OffersHeader />
			{data ? <OfferList offers={data} name={searchParams.filter as string} /> : "Brak Ofert"}
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
