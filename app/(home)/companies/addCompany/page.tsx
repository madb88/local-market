import AddNewCompanyForm from "@/app/components/pages/Companies/Functions/Form/AddNewCompanyForm";
import BackButton from "@/app/components/ui/atoms/BackButton";

export default function AddNewCompanyPage() {
	return (
		<div className="flex flex-col gap-5 px-5 pt-2">
			<div className="flex justify-between pt-2">
				<h2 className="text-4xl font-extrabold dark:text-white">Dodaj nową firmę</h2>
				<BackButton />
			</div>
			<div>
				<AddNewCompanyForm />
			</div>
		</div>
	);
}
