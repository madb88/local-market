import { capitalizeFirstLetter } from "@/lib/helpers/functions";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";

type OfferBreadCrumbsT = {
	categoryName: string | null;
	name: string | null;
};

export default function OfferBreadCrumbs({ categoryName, name }: OfferBreadCrumbsT) {
	return (
		<Breadcrumbs>
			<BreadcrumbItem>
				<Link href={"/offers"}>Kategorie</Link>
			</BreadcrumbItem>
			<BreadcrumbItem>
				<Link href={`/offers/${categoryName}`}>
					{categoryName ? capitalizeFirstLetter(categoryName) : null}
				</Link>
			</BreadcrumbItem>
			<BreadcrumbItem>{name}</BreadcrumbItem>
		</Breadcrumbs>
	);
}
