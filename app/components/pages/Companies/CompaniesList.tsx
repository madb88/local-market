import { type CompanyType } from "@/lib/supabase/serverAppRouter";
import { Folder } from "lucide-react";
import { isEmpty } from "ramda";
import CompanyListElement from "./CompanyListElement";

export default function CompaniesList({ companies }: { companies: CompanyType[] }) {
	return (
		<div className="h-fit">
			{!isEmpty(companies) ? (
				<ul className="grid gap-2 px-5 pt-2 md:grid-cols-2">
					{companies.map((company: CompanyType, index) => (
						<li key={index}>
							<CompanyListElement company={company} />
						</li>
					))}
				</ul>
			) : (
				<div className="flex flex-col justify-center gap-5 pt-16">
					<span className="flex justify-center">
						<Folder />
					</span>
					<h3 className="flex justify-center">Brak Firm</h3>
				</div>
			)}
		</div>
	);
}
