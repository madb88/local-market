import Link from "next/link";
import { Store, Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../../toggle-mode";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import SheetNavigation from "../molecules/SheetNavigation";

export default function SearchBar() {
	return (
		<div className="grid grid-cols-searchNavigation grid-rows-2 bg-slate-100 px-5 pt-6 dark:bg-black md:grid-cols-searchNavigationMid md:grid-rows-1 md:py-5">
			<Link href="/">
				<div className="flex gap-2 pt-2 md:justify-center">
					<Store /> Local Market
				</div>
			</Link>

			<div className="order-4 col-span-3  py-2 md:order-2 md:col-span-1 md:py-0">
				<div className="w-22 flex items-center space-x-2 md:w-3/4">
					<div className="md:hidden">
						<SheetNavigation />
					</div>
					<Input />
					<Button type="submit">
						<Search />
					</Button>
				</div>
			</div>
			<div className="order-2 flex justify-end px-3 pt-1.5 md:order-3 md:px-1">
				<UserButton afterSignOutUrl="/" />
			</div>
			<div className="order-3 flex justify-end">
				<ModeToggle />
			</div>
		</div>
	);
}
