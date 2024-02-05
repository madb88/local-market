import CompanyListElement from "./CompanyListElement";
import { type CompanyType } from "@/lib/supabase/serverAppRouter";

export default function CompaniesList({ companies }: { companies: CompanyType[] }) {
	return (
		<div className="h-fit">
			<ul className="grid gap-2 px-5 pt-2 md:grid-cols-2">
				{companies.map((company: CompanyType) => (
					<li key={company.id}>
						<CompanyListElement company={company} />
					</li>
				))}
			</ul>
		</div>
	);
}
