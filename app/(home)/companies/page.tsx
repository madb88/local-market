import { Suspense } from "react";
import { getAllCompanies } from "@/api/companies";
import CompaniesList from "@/app/components/pages/Companies/CompaniesList";
import { notFound } from "next/navigation";

export const revalidate = 5;

export default async function Companies() {
	const companies = await getAllCompanies();

	if (!companies) {
		notFound();
	}

	return (
		<>
			<Suspense fallback={<div>Loading</div>}>
				{companies && <CompaniesList companies={companies} />}
			</Suspense>
		</>
	);
}
