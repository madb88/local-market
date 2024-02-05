import { type CompanyType } from "@/lib/supabase/serverAppRouter";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/atoms/card";
import { Image } from "lucide-react";

export default function CompanyListElement({ company }: { company: CompanyType }) {
	return (
		<>
			<Card className="flex h-full">
				<CardHeader>
					<CardTitle>{company.name}</CardTitle>
					<CardDescription>{company.description}</CardDescription>
				</CardHeader>
			</Card>
		</>
	);
}
