"use client";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { Edit } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddOfferToFavorite from "../Functions/AddOfferToFavorite";
import OfferBreadCrumbs from "./OfferBreadCrumbs";

type OfferHeaderT = {
	categoryName: string | null;
	name: string | null;
	authorId: string | null;
	offerId: number;
	isFavorite: boolean;
};

export default function OfferHeader({
	categoryName,
	name,
	authorId,
	offerId,
	isFavorite,
}: OfferHeaderT) {
	const pathname = usePathname();

	const { user, isSignedIn } = useUser();

	return (
		<div className="flex justify-between">
			<div className="">
				<OfferBreadCrumbs categoryName={categoryName} name={name} />
			</div>

			<div className="flex gap-2">
				{isSignedIn && <AddOfferToFavorite offerId={offerId} isFavorite={isFavorite} />}
				{user && user.id === authorId ? (
					<Link href={`${pathname}/edit`}>
						<Button
							aria-label="Edytuj"
							color="primary"
							className="shadow-lg"
							variant="ghost"
							endContent={<Edit />}
						>
							Edytuj
						</Button>
					</Link>
				) : null}
				<BackButton />
			</div>
		</div>
	);
}
