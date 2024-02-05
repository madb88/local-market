import { type CompanyType } from "@/lib/supabase/serverAppRouter";
import CompanyListElement from "./CompanyListElement";

export default function CompaniesList({ companies }: { companies: CompanyType[] }) {
	return (
		<div>
			<ul>
				{companies.map((company: CompanyType) => (
					<li key={company.id}>
						<CompanyListElement company={company} />
					</li>
				))}
			</ul>
		</div>
	);
}
