import { getAllCompanies, getCompany } from "@/api/companies";
import { Suspense } from "react";
import Loading from "./loading";

export const dynamicParams = false;
export const dynamic = "force-static";

type PageParams = {
	id: string;
};

export async function generateStaticParams(): Promise<PageParams[]> {
	const companies = await getAllCompanies();

	const result = companies?.map((company) => ({
		id: String(company.id),
	}));

	return result as PageParams[];
}

export default async function CompanyPage({ params }: { params: { id: string } }) {
	const company = await getCompany(params.id);
	return (
		<Suspense fallback={<Loading />}>
			<div>{company && `Company ${company.name}`}</div>
		</Suspense>
	);
}
