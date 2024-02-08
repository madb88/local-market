"use client";

import { List } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../../../atoms/sheet";
import Navigation from "../../Navigation";

export default function BottomNavigationCategories() {
	return (
		<Sheet key={"bottom"}>
			<SheetTrigger asChild className="w-full">
				<List />
			</SheetTrigger>
			<SheetContent side={"bottom"} className="flex w-screen justify-center">
				<Navigation inSheet={true} />
			</SheetContent>
		</Sheet>
	);
}
