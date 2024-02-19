import { OfferType } from "@/lib/supabase/serverAppRouter";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/atoms/card";

export default function CategoryListElement({ offer }: { offer: OfferType }) {
	return (
		<>
			<Link href={`/offers/${offer.id}`}>
				<Card className="flex h-full hover:bg-gray-100 dark:hover:bg-gray-900">
					<CardHeader>
						<CardTitle>{offer.name}</CardTitle>
						<CardDescription>{offer.description}</CardDescription>
					</CardHeader>
				</Card>
			</Link>
		</>
	);
}
