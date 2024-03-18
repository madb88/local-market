import { getLastCompanies } from "@/app/api/companies";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import CompaniesCarousel from "../CompaniesCarousel";

export default async function LastCompanies() {
	const lastCompanies = await getLastCompanies();

	return (
		<div>
			<Card>
				<CardHeader>
					<h1 className="px-5 text-base">Najnowsze oferty:</h1>
				</CardHeader>
				<CardBody className="h-auto w-full pb-10 pt-10 md:px-20">
					{lastCompanies.length > 0 ? (
						<CompaniesCarousel data={lastCompanies} />
					) : (
						<p className="flex justify-center">{"Brak Firm"}</p>
					)}
				</CardBody>
			</Card>
		</div>
	);
}
