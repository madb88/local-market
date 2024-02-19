"use client";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { Button } from "@/app/components/ui/atoms/button";
import { Star } from "lucide-react";
import OfferBreadCrumbs from "./OfferBreadCrumbs";

type OfferHeaderT = {
	categoryName: string | null;
	name: string | null;
};

export default function OfferHeader({ categoryName, name }: OfferHeaderT) {
	return (
		<div className="flex justify-between">
			<div className="">
				<OfferBreadCrumbs categoryName={categoryName} name={name} />
			</div>

			<div className="flex gap-2">
				<Button aria-label="Do ulubionych" size="icon" variant="outline">
					<Star />
				</Button>
				{/* {user && user.id === authorId ? (
				<Button variant="outline">
					<Link href={`${pathname}/edit`}>
						<p className="text-base">Edytuj</p>
					</Link>
				</Button>
			) : null} */}
				<BackButton />
			</div>
		</div>
	);
}
