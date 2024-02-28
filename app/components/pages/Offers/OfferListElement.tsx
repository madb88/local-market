import { type OfferType } from "@/lib/supabase/serverAppRouter";
import { Chip, Image } from "@nextui-org/react";
import { format } from "date-fns";
import { Camera } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardTitle } from "../../ui/atoms/card";

export default function OfferListElement({ offer }: { offer: OfferType }) {
	return (
		<>
			<Link href={`/offers/${offer.category_name}/${offer.id}`}>
				<Card className="flex h-36 flex-row overflow-hidden shadow-lg hover:bg-gray-100 dark:hover:bg-gray-900">
					<div className="w-40">
						{offer.image ? (
							<Image
								src={offer.image}
								alt="Obrazek Oferty"
								width={250}
								height={250}
								sizes="(min-width: 2880px) 400px, (min-width: 780px) calc(16.06vw - 59px), calc(33.7vw - 30px)"
								radius="md"
								className="object-cover"
							/>
						) : (
							<div className="flex h-full justify-center pt-14">
								<Camera />
							</div>
						)}
					</div>

					<CardContent className="flex w-full flex-col pt-2">
						<div className="flex justify-between">
							<CardTitle>
								<div className="flex pt-2">{offer.name}</div>
							</CardTitle>
						</div>
						<div className="flex h-full justify-end pt-14">
							<Chip color="primary">{format(new Date(offer.created_at), "dd/MM/yyyy")}</Chip>
						</div>
					</CardContent>
				</Card>
			</Link>
		</>
	);
}
