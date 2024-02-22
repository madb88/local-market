import { getAllCompanies, getCompany } from "@/app/api/companies";
import Company from "@/app/components/pages/Companies/DetailsPage/Company";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";

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
	revalidateTag("company");
	const company = await getCompany(params.id);

	if (!company) {
		notFound();
	}

	return (
		<>
			<div className="h-full p-5">{company && <Company company={company} />}</div>
		</>
	);
}
