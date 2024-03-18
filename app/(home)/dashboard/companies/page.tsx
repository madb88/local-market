import { getUserCompanies, getUserFavoriteCompanies } from "@/app/api/companies";
import UserCompaniesTable from "@/app/components/pages/Dashboard/Options/UserCompaniesTable";
import { currentUser } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

export async function generateMetadata(): Promise<Metadata> {
	const user = await currentUser();

	return {
		title: `Firmy Użytkownika ${user?.firstName} - ${user?.lastName}`,
	};
}

export default async function DashboardUserCompaniesPage() {
	const user = await currentUser();

	const userCompanies = user ? await getUserCompanies(user?.id) : [];
	const userFavoriteComapnies = user ? await getUserFavoriteCompanies(user?.id) : [];

	const headers = ["Nazwa", "Status", "Utworzona dnia", "Akcje"];

	return (
		<Suspense fallback={<Loading />}>
			<div>
				<h1 className="pb-2 text-large">Moje firmy:</h1>
				{<UserCompaniesTable headers={headers} data={userCompanies} />}
			</div>
			<div>
				<h1 className="pb-2 pt-2 text-large">Obserwowane firmy:</h1>
				{<UserCompaniesTable headers={headers} data={userFavoriteComapnies} favoriteData={true} />}
			</div>
		</Suspense>
	);
}
