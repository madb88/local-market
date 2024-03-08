/* eslint-disable @typescript-eslint/no-unused-vars */
import AllUsersOffersTable from "@/app/components/pages/Admin/AllUsersOffersTable";
import { checkSpecificRole } from "@/app/utils/checkRole";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 1;

// async function getData(): Promise<{ offers: OfferType[] }> {
// 	try {
// 		const res = await fetch(`${process.env.API_PATH}/api/offers/all`);

// 		if (!res.ok) {
// 			throw new Error("Failed to fetch data");
// 		}

// 		return (await res.json()) as { offers: OfferType[] };
// 	} catch (error) {
// 		throw error;
// 	}
// }

export default async function AdminDashboardOffersPage({
	params,
	searchParams,
}: {
	params: { categoryName?: string; status?: string };
	searchParams: { [key: string]: string | string[] };
}) {
	if (!checkSpecificRole("admin")) {
		return "Brak uprawnien";
	}
	const headers = ["Nazwa", "Kategoria", "Status", "Utworzona dnia", "Akcje"];

	return (
		<Suspense fallback={<Loading />}>
			<div>
				<h1 className="pb-2 text-large">Moje oferty:</h1>
				<AllUsersOffersTable headers={headers} />
			</div>
		</Suspense>
	);
}
