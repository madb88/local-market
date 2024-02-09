"use client";

import { Button } from "@/app/components/ui/atoms/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddNewCompanyButton() {
	const pathname = usePathname();
	console.log(pathname);

	return (
		<Link href={`${pathname}/addCompany`}>
			<Button>
				<p>Dodaj firmę</p>
			</Button>
		</Link>
	);
}
