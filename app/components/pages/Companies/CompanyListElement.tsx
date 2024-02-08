import { type CompanyType } from "@/lib/supabase/serverAppRouter";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/atoms/card";
import Link from "next/link";

export default function CompanyListElement({ company }: { company: CompanyType }) {
	return (
		<>
			<Link href={`/companies/${company.id}`}>
				<Card className="flex h-full">
					<CardHeader>
						<CardTitle>{company.name}</CardTitle>
						<CardDescription>{company.description}</CardDescription>
					</CardHeader>
				</Card>
			</Link>
		</>
	);
}
