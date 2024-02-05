import { type CompanyType } from "@/lib/supabase/serverAppRouter";
export default function CompanyListElement({ company }: { company: CompanyType }) {
	return <div>{company.name}</div>;
}
