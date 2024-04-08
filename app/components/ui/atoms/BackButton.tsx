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
			<Link href={previousPathname}>
				<Button color="primary" aria-label="Wroc" className="shadow-lg" variant="ghost">
					Wróć
				</Button>
			</Link>
		</>
	);
}
