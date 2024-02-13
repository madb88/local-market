import CompanyHeader from "./CompanyHeader";
import CompanyImage from "./CompanyImage";
import { type CompanyDetailsPageT } from "./types";

export default function Company({ company }: CompanyDetailsPageT) {
	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-end">
				<CompanyHeader />
			</div>
			<div>
				<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
					{company.name}
				</h1>
				<div>
					<p className="text-lg font-normal text-gray-500 dark:text-gray-400  lg:text-xl">
						{company.description}
					</p>
				</div>
				<div className="flex w-2/12 flex-col pt-5">
					<h3>Zdjęcia</h3>
					<CompanyImage company={company} />
				</div>
			</div>
		</div>
	);
}
