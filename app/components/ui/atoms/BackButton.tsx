"use client";

import { Button, Link } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BackButton() {
	const pathname = usePathname();
	const finalSlashIndex = pathname.lastIndexOf("/");
	const previousPathname = pathname.slice(0, finalSlashIndex);

	return (
		<>
			<Button
				href={previousPathname}
				as={Link}
				color="primary"
				variant="solid"
				size="md"
				startContent={<ArrowLeft />}
			>
				<p className="text-base">Wróć</p>
			</Button>
		</>
	);
}
