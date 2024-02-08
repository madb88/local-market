import { Suspense } from "react";
import { getAllCompanies, getCompany } from "@/api/companies";
import Loading from "./loading";
import { CompanyType } from "@/lib/supabase/serverAppRouter";

export const dynamicParams = false;

export async function generateStaticParams() {
	const companies = await getAllCompanies();
	return companies?.map((company) => ({
		id: String(company.id),
	}));
}

export default async function CompanyPage({ params }: { params: { id: string } }) {
	const company = await getCompany(params.id);
	return (
		<Suspense fallback={<Loading />}>
			<div>{company && `Company ${company.name}`}</div>
		</Suspense>
	);
}
