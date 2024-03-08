"use client";

import { Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminTabs() {
	const pathname = usePathname();
	return (
		<div className="flex w-full flex-col">
			<Tabs
				aria-label="Options"
				fullWidth
				color="primary"
				selectedKey={pathname}
				className="rounded-lg  shadow-lg"
			>
				<Tab
					key="/dashboard/admin/offers"
					title="Wszystkie Oferty"
					href="/dashboard/admin/offers"
					as={Link}
				></Tab>
				<Tab
					key="/dashboard/admin/companies"
					title="Wszystkie Firmy"
					href="/dashboard/admin/companies"
					as={Link}
				></Tab>
				<Tab
					key="/dashboard/admin/users"
					title="Użytkownicy"
					href="/dashboard/admin/users"
					as={Link}
				></Tab>
			</Tabs>
		</div>
	);
}
