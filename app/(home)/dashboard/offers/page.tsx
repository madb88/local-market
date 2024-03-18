import { getUserFavoriteOffers, getUserOffers } from "@/app/api/offers";
import UserOffersTable from "@/app/components/pages/Dashboard/Options/UserOffersTable";
import { currentUser } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 1;

export async function generateMetadata(): Promise<Metadata> {
	const user = await currentUser();

	return {
		title: `Oferty Użytkownika ${user?.firstName} - ${user?.lastName}`,
	};
}

export default async function DashboardUserOffersPage() {
	const user = await currentUser();

	const userOffers = user ? await getUserOffers(user?.id) : [];
	const userFavoriteOffers = user ? await getUserFavoriteOffers(user?.id) : [];

	const headers = ["Nazwa", "Kategoria", "Status", "Utworzona dnia", "Akcje"];

	return (
		<Suspense fallback={<Loading />}>
			<div>
				<h1 className="pb-2 text-large">Moje oferty:</h1>
				<UserOffersTable headers={headers} data={userOffers} />
			</div>
			<div>
				<h1 className="pb-2 pt-2 text-large">Obserwowane oferty:</h1>
				{<UserOffersTable headers={headers} data={userFavoriteOffers} favoriteData={true} />}
			</div>
		</Suspense>
	);
}
