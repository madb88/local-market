"use client";

import { Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardTabs() {
	const pathname = usePathname();
	return (
		<div className="flex w-full flex-col">
			<Tabs aria-label="Options" fullWidth color="primary" selectedKey={pathname}>
				<Tab key="/dashboard/offers" title="Oferty" href="/dashboard/offers" as={Link}></Tab>
				<Tab key="/dashboard/companies" title="Firmy" href="/dashboard/companies" as={Link}></Tab>
				<Tab key="/dashboard/user" title="Uzytkownik" href="/dashboard/user" as={Link}></Tab>
			</Tabs>
		</div>
	);
}
