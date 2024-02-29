import { getAllCompanies, getCompany } from "@/app/api/companies";
import { checkIfCompanyIsFavorite } from "@/app/api/favorites/companies";
import Company from "@/app/components/pages/Companies/DetailsPage/Company";
import { currentUser } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";

// export const dynamic = "force-static";

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
	revalidateTag("isFavorite");

	const company = await getCompany(params.id);
	const user = await currentUser();

	if (!company) {
		notFound();
	}

	const isFavorite = user ? await checkIfCompanyIsFavorite(company.id, user.id) : false;

	return (
		<>
			<div className="h-full p-5">
				{company && <Company company={company} isFavorite={isFavorite} />}
			</div>
		</>
	);
}
