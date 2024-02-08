"use client";

import { Sheet, SheetTrigger, SheetContent } from "../../../atoms/sheet";
import { List } from "lucide-react";
import Navigation from "../../Navigation";

export default function BottomNavigationCategories() {
	return (
		<Sheet key={"bottom"}>
			<SheetTrigger asChild>
				<List />
			</SheetTrigger>
			<SheetContent side={"bottom"} className="flex w-screen justify-center">
				<Navigation inSheet={true} />
			</SheetContent>
		</Sheet>
	);
}
