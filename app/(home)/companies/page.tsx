import getAllCompanies from "@/api/companies";
import CompaniesList from "@/app/components/pages/Companies/CompaniesList";

export default async function Companies() {
	const companies = await getAllCompanies();

	return <>{companies && <CompaniesList companies={companies} />}</>;
}
