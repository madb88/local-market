"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

export default function BackButton() {
	const pathname = usePathname();
	const finalSlashIndex = pathname.lastIndexOf("/");
	const previousPathname = pathname.slice(0, finalSlashIndex);

	return (
		<Link href={previousPathname}>
			<Button variant={"outline"}>Wróć</Button>
		</Link>
	);
}
