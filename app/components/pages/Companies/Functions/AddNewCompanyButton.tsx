"use client";

import { Button, Link } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AddNewCompanyButton() {
	const pathname = usePathname();
	console.log(pathname);

	return (
		<Button
			href={`${pathname}/addCompany`}
			as={Link}
			color="primary"
			variant="solid"
			size="md"
			endContent={<Plus />}
		>
			<p className="text-base">Dodaj firmę</p>
		</Button>
	);
}
