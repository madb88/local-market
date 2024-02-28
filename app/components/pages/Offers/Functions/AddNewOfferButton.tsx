"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddNewOfferButton({ href }: { href?: string }) {
	const pathname = usePathname();

	const link = href ? href : `${pathname}/add`;

	return (
		<>
			<Button
				color="primary"
				radius="full"
				className="bg-gradient-to-tr from-orange-700 to-yellow-500 text-white shadow-lg"
				aria-label="Dodaj oferte"
			>
				<Link href={link}>
					<p className="text-base">Dodaj Ofertę</p>
				</Link>
			</Button>
		</>
	);
}
