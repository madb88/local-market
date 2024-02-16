import { UserButton } from "@clerk/nextjs";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Input as NextInput,
} from "@nextui-org/react";
import { Search, Store } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../../toggle-mode";
import SheetNavigation from "../molecules/SheetNavigation";

export default function SearchBar() {
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
								<Store />{" "}
							</span>
							<p className="hidden font-bold text-inherit sm:block">Local Market</p>
						</div>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent as="div" className="w-full items-center" justify="center">
				<NextInput
					classNames={{
						base: "w-full h-10",
						mainWrapper: "h-full",
						input: "text-small",
						inputWrapper:
							"h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
					}}
					placeholder="Szukaj"
					size="sm"
					startContent={<Search size={18} />}
					type="search"
				/>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<UserButton afterSignOutUrl="/" />
				</NavbarItem>
				<NavbarItem>
					<ModeToggle />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
