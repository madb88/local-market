import { type CompanyType } from "@/lib/supabase/serverAppRouter";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/atoms/card";

export default function CompanyListElement({ company }: { company: CompanyType }) {
	return (
		<>
			<Link href={`/companies/${company.id}`}>
				<Card className="flex h-full hover:bg-gray-100 dark:hover:bg-gray-900">
					<CardHeader>
						<CardTitle>{company.name}</CardTitle>
						<CardDescription>{company.description}</CardDescription>
					</CardHeader>
				</Card>
			</Link>
		</>
	);
}
