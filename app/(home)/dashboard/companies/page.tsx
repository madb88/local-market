import { getUserCompanies } from "@/app/api/companies";
import UserCompaniesTable from "@/app/components/pages/Dashboard/Options/UserCompaniesTable";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import Loading from "./loading";

export default async function DashboardUserCompaniesPage() {
	const user = await currentUser();

	const userCompanies = user ? await getUserCompanies(user?.id) : [];

	const headers = ["Nazwa", "Status", "Utworzona dnia", "Akcje"];

	return (
		<Suspense fallback={<Loading />}>
			<div>{<UserCompaniesTable headers={headers} data={userCompanies} />}</div>
		</Suspense>
	);
}
