import { getOffersByCategory } from "@/app/api/offers";
import OfferList from "@/app/components/pages/Offers/OfferList";
import OffersHeader from "@/app/components/pages/Offers/OffersHeader";
import { Pagination } from "@/app/components/ui/molecules/Pagination";
import { Suspense } from "react";
import Loading from "./loading";

export default async function DetailCategoryPage({
	params,
	searchParams,
}: {
	params: { categoryName: string };
	searchParams: { [key: string]: string | string[] };
}) {
	const page = (searchParams["page"] as string) ?? "1";
	const per_page = (searchParams["per_page"] as string) ?? "10";
	const start = (Number(page) - 1) * Number(per_page);
	const end = start - 1 + Number(per_page);
	const { offers, count } = await getOffersByCategory(start, end, params.categoryName);

	if (!offers) {
		return "Brak ofert";
	}

	return (
		<Suspense fallback={<Loading />}>
			<OffersHeader />
			{offers ? <OfferList offers={offers} name={params.categoryName} /> : "Brak Ofert"}
			{count ? (
				<div className="flex justify-center pb-10 pt-10 ">
					<Pagination
						hasNextPage={end < count}
						hasPrevPage={start > 0}
						currentPage={page}
						perPage={per_page}
						count={count}
						url={`categories/${params.categoryName}`}
					/>
				</div>
			) : null}
		</Suspense>
	);
}
