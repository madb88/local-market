import { getAllCompanies, getCompany } from "@/api/companies";
import Company from "@/app/components/pages/Companies/DetailsPage/Company";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

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

	if (!company) {
		notFound();
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className="h-screen p-10">{company && <Company company={company} />}</div>
		</Suspense>
	);
}
