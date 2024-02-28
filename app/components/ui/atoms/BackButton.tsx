"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackButton() {
	const pathname = usePathname();
	const finalSlashIndex = pathname.lastIndexOf("/");
	const previousPathname = pathname.slice(0, finalSlashIndex);

	return (
		<>
			<Button color="primary" aria-label="Wroc" className="shadow-lg" variant="ghost">
				<Link href={previousPathname}>
					<p className="text-base">Wróć</p>
				</Link>
			</Button>
		</>
	);
}
