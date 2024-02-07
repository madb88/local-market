import { notFound } from "next/navigation";
import { getCompanies } from "@/api/companies";
import { Pagination } from "@/app/components/ui/molecules/Pagination";
import CompaniesList from "@/app/components/pages/Companies/CompaniesList";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 60;

export default async function Companies({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] };
}) {
	const page = (searchParams["page"] as string) ?? "1";
	const per_page = (searchParams["per_page"] as string) ?? "8";
	const start = (Number(page) - 1) * Number(per_page);
	const end = start - 1 + Number(per_page);

	const { companies, count } = await getCompanies(start, end);

	if (!companies) {
		notFound();
	}

	return (
		<Suspense fallback={<Loading />}>
			{companies && <CompaniesList companies={companies} />}
			{count && (
				<div className="flex justify-center pb-10 pt-10 lg:fixed lg:bottom-10 lg:w-11/12">
					<Pagination
						hasNextPage={end < count}
						hasPrevPage={start > 0}
						currentPage={page}
						perPage={per_page}
						count={count}
					/>
				</div>
			)}
		</Suspense>
	);
}
