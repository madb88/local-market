"use client";

import { Button } from "@/app/components/ui/atoms/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddNewCompanyButton() {
	const pathname = usePathname();

	return (
		<Button asChild>
			<Link href={`${pathname}/add`}>Dodaj Firmę</Link>
		</Button>
	);
}
