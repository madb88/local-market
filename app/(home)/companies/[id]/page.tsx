import { getCompany } from "@/app/api/companies";
import { checkIfCompanyIsFavorite } from "@/app/api/favorites/companies";
import Company from "@/app/components/pages/Companies/DetailsPage/Company";
import { currentUser } from "@clerk/nextjs";
import { type Metadata } from "next";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";

type Props = {
	params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.id;

	const company = await getCompany(id);

	return {
		title: company?.name,
		description: company?.description,
		openGraph: {
			images: [`${company?.images}`],
		},
	};
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
