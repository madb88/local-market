/* eslint-disable @typescript-eslint/no-unused-vars */
import AllUsersOffersTable from "@/app/components/pages/Dashboard/Options/admin/AllUsersOffersTable";
import { type OfferType } from "@/lib/supabase/serverAppRouter";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 1;

async function getData(): Promise<{ offers: OfferType[] }> {
	try {
		const res = await fetch(`${process.env.API_PATH}/api/offers/all`);

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}

		return (await res.json()) as { offers: OfferType[] };
	} catch (error) {
		throw error;
	}
}

export default async function AdminDashboardOffersPage({
	params,
	searchParams,
}: {
	params: { categoryName?: string; status?: string };
	searchParams: { [key: string]: string | string[] };
}) {
	// const page = (searchParams["page"] as string) ?? "1";
	// const per_page = (searchParams["per_page"] as string) ?? "2";
	// const start = (Number(page) - 1) * Number(per_page);
	// const end = start + Number(per_page);
	// const { offers } = await getAllOffersWithFilters(start, end, params.categoryName, params.status);

	console.log("Dupa");
	const { offers } = await getData();
	console.log("response", offers);

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
