"use client";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { Button } from "@/app/components/ui/atoms/button";
import { checkRoleClient } from "@/app/utils/checkRole";
import { useUser } from "@clerk/nextjs";
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
				{isSignedIn && user.publicMetadata.role && checkRoleClient(user?.publicMetadata.role) && (
					<AddOfferToFavorite offerId={offerId} isFavorite={isFavorite} />
				)}
				{user && user.id === authorId ? (
					<Button variant="outline" aria-label="Edytuj">
						<Link href={`${pathname}/edit`}>
							<p className="text-base">Edytuj</p>
						</Link>
					</Button>
				) : null}
				<BackButton />
			</div>
		</div>
	);
}
