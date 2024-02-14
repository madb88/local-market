"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

export default function BackButton() {
	const pathname = usePathname();
	const finalSlashIndex = pathname.lastIndexOf("/");
	const previousPathname = pathname.slice(0, finalSlashIndex);

	return (
		<>
			<Button color="primary">
				<Link href={previousPathname}>
					<p className="text-base">Wróć</p>
				</Link>
			</Button>
		</>
	);
}
