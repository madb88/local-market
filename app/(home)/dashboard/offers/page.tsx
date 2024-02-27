import { getUserOffers } from "@/app/api/offers";
import UserOffersTable from "@/app/components/pages/Dashboard/UserOffersTable";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 60;

export default async function DashboardUserOffersPage() {
	const user = await currentUser();

	const userOffers = user ? await getUserOffers(user?.id) : [];

	const headers = ["Nazwa", "Kategoria", "Status", "Utworzona dnia", "Akcje"];

	return (
		<Suspense fallback={<Loading />}>
			<div>
				<UserOffersTable headers={headers} data={userOffers} />
			</div>
		</Suspense>
	);
}
