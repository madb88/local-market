import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";
import LastCompanies from "../../pages/HomePage/LastCompanies/LastCompanies";
import LastOffers from "../../pages/HomePage/LastOffers/LastOffers";

export default function HomeInfo() {
	return (
		<div className="flex flex-col gap-2 bg-slate-100 px-2 pt-2  dark:bg-slate-600 md:px-10">
			<div className="grid grid-cols-2 grid-rows-3 gap-5">
				<div className="col-span-2">
					<Suspense
						fallback={
							<div className="flex justify-center pt-5">
								<Spinner label="Ładuję najnowsze oferty" />
							</div>
						}
					>
						<LastOffers />
					</Suspense>
				</div>
				<div className="col-span-2">
					<div className="col-span-2">
						<Suspense
							fallback={
								<div className="flex justify-center pt-5">
									<Spinner label="Ładuję najnowsze firmy" />
								</div>
							}
						>
							<LastCompanies />
						</Suspense>
					</div>
				</div>
				{/*<div className="bg-green-500">Info 1</div>
				<div className="bg-purple-500">Info 2</div> */}
			</div>
		</div>
	);
}
