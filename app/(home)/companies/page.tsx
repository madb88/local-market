import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCompanies } from "@/api/companies";
import { Pagination } from "@/app/components/ui/molecules/Pagination";
import CompaniesList from "@/app/components/pages/Companies/CompaniesList";

export const revalidate = 5;

export default async function Companies({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] };
}) {
	const page = searchParams["page"] ?? "1";
	const per_page = searchParams["per_page"] ?? "4";
	const start = (Number(page) - 1) * Number(per_page);
	const end = start - 1 + Number(per_page);

	const { companies, count } = await getCompanies(start, end);

	if (!companies) {
		notFound();
	}
	console.log("start", start);
	console.log("end", end);
	console.log(count);
	return (
		<>
			<Suspense fallback={<div>Loading</div>}>
				{companies && <CompaniesList companies={companies} />}
				{count && (
					<Pagination
						hasNextPage={end < count}
						hasPrevPage={start > 0}
						currentPage={page}
						perPage={per_page}
						count={count}
					/>
				)}
			</Suspense>
		</>
	);
}
