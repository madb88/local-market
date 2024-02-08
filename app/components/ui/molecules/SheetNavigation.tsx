import { Menu } from "lucide-react";
import Navigation from "../organisms/Navigation";
import { Sheet, SheetTrigger, SheetContent } from "../atoms/sheet";

export default function SheetNavigation() {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu />
			</SheetTrigger>
			<SheetContent side={"left"} className="flex w-screen justify-center">
				<Navigation inSheet={true} />
			</SheetContent>
		</Sheet>
	);
}
