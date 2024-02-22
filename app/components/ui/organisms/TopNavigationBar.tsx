"use client";
import { checkRoleClient } from "@/app/utils/checkRole";
import { useUser } from "@clerk/nextjs";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Store } from "lucide-react";
import Link from "next/link";
import AddNewOfferButton from "../../pages/Offers/Functions/AddNewOfferButton";
import { ModeToggle } from "../../toggle-mode";
import LoginButton from "../atoms/LoginButton";
import SearchBar from "../molecules/SearchBar";
import SheetNavigation from "../molecules/SheetNavigation";

export default function TopNavigationBar() {
	const { user } = useUser();

	return (
		<Navbar shouldHideOnScroll>
			<NavbarContent justify="start">
				<NavbarItem className="lg:flex">
					<div className="md:hidden">
						<SheetNavigation />
					</div>
				</NavbarItem>
				<NavbarBrand>
					<Link href="/">
						<div className="flex gap-2 pt-2 md:justify-center">
							<span className="hidden sm:block">
								<Store />
							</span>
							<p className="hidden font-bold text-inherit sm:block">Local Market</p>
						</div>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent as="div" className="w-full items-center" justify="center">
				<SearchBar />
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden md:inline-block">
					{user && checkRoleClient(user?.publicMetadata.role) && <AddNewOfferButton />}
				</NavbarItem>
				<NavbarItem className="hidden md:inline-block">
					<LoginButton />
				</NavbarItem>
				<NavbarItem className="hidden md:inline-block">
					<ModeToggle />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
