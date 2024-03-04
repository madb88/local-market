"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Store } from "lucide-react";
import Link from "next/link";
import AddNewOfferButton from "../../pages/Offers/Functions/AddNewOfferButton";
import { ModeToggle } from "../../toggle-mode";
import LoginButton from "../atoms/LoginButton";
import SearchBar from "../molecules/SearchBar";
import SheetNavigation from "../molecules/SheetNavigation";

export default function TopNavigationBar() {
	return (
		<Navbar shouldHideOnScroll maxWidth="full">
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
							<p className="hidden font-bold text-inherit sm:block">Osiedlowe Targowisko</p>
						</div>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent as="div" className="w-screen items-center" justify="center">
				<SearchBar />
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden md:inline-block">
					<AddNewOfferButton href="/offers/all/add" />
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
