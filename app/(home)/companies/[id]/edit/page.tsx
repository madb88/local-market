import { getCompany } from "@/app/api/companies";
import CompanyForm from "@/app/components/pages/Companies/Functions/Form/CompanyForm";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { currentUser } from "@clerk/nextjs";

export default async function EditCompanyPage({ params }: { params: { id: string } }) {
	const company = await getCompany(params.id);

	const user = await currentUser();

	if (!user) {
		return <p>Brak uprawnień</p>;
	}

	return (
		<div className="flex flex-col gap-5 px-5 pt-2">
			<div className="flex justify-end pt-2">
				<BackButton />
			</div>
			{company ? (
				<div className="xl:w-6/6">
					<h2 className="text-4xl font-extrabold dark:text-white">Edytuj firmę {company.name}</h2>
					<CompanyForm data={company} />
				</div>
			) : null}
		</div>
	);
}
