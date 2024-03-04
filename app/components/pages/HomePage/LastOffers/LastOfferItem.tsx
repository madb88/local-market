import { categoriesWithKeys } from "@/app/utils/categoriesData";
import { type OfferType } from "@/lib/supabase/serverAppRouter";
import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react";
import { format } from "date-fns";
import NextImage from "next/image";
import Link from "next/link";

export default function LastOfferItem({ offer }: { offer: OfferType }) {
	return (
		<Link href={`/offers/${offer.category_name}/${offer.id}`}>
			<Card className=" cursor-pointer bg-slate-100 py-4 shadow-md  dark:bg-slate-500">
				<CardHeader className="flex-col items-start px-4 pb-0 pt-2">
					<div className="flex w-full justify-between">
						<p className="text-tiny font-bold uppercase">
							{format(new Date(offer.created_at), "dd/MM/yyyy")}
						</p>
						{offer.category_name ? (
							<Chip color="primary">
								<small className="text-tiny">{categoriesWithKeys[offer.category_name].label}</small>
							</Chip>
						) : (
							"Brak Kategorii"
						)}
					</div>
					<h4 className="text-large font-bold">{offer.name}</h4>
				</CardHeader>
				<CardBody className="overflow-visible">
					<div className="flex justify-center">
						{offer.image ? (
							<Image
								as={NextImage}
								alt="Card background"
								className="rounded-xl object-cover"
								src={offer.image}
								width={150}
								height={150}
							/>
						) : (
							<Image src="noPhoto.png" height={250} width={250} alt={"Brak zdjecia"} />
						)}
					</div>
				</CardBody>
			</Card>
		</Link>
	);
}
