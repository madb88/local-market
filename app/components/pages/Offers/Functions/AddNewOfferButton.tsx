"use client";

import { checkRoleClient } from "@/app/utils/checkRole";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AddNewOfferButton({ href }: { href?: string }) {
	const pathname = usePathname();
	const { user } = useUser();
	const link = href ? href : `${pathname}/add`;

	const disableButton =
		user &&
		user.publicMetadata.role &&
		checkRoleClient(user?.publicMetadata.role) &&
		pathname !== "/"
			? false
			: true;

	return (
		<>
			<Button
				color="primary"
				radius="full"
				className="bg-gradient-to-tr from-orange-700 to-yellow-500 text-white shadow-lg"
				aria-label="Dodaj oferte"
				isDisabled={disableButton}
			>
				<Link href={link}>
					<p className="text-base">Dodaj Ofertę</p>
				</Link>
			</Button>
		</>
	);
}
