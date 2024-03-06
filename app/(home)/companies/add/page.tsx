import CompanyForm from "@/app/components/pages/Companies/Functions/Form/CompanyForm";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { checkRole } from "@/app/utils/checkRole";
import { currentUser } from "@clerk/nextjs";

export const revalidate = 1;
export default async function AddNewCompanyPage() {
	const user = await currentUser();

	if (!user || !checkRole()) {
		return <p>Brak uprawnień</p>;
	}
	return (
		<div className="flex flex-col gap-5 px-5 pt-2">
			<div className="flex justify-end pt-2">
				<BackButton />
			</div>
			<div className="xl:w-6/6">
				<h2 className="text-4xl font-extrabold dark:text-white">Dodaj nową firmę</h2>
				<CompanyForm />
			</div>
		</div>
	);
}
