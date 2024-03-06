import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../atoms/sheet";
import Navigation from "../organisms/Navigation";

export default function SheetNavigation() {
	return (
		<Sheet>
			<SheetTrigger>
				<Menu />
			</SheetTrigger>
			<SheetContent
				side={"left"}
				className="flex w-screen justify-center bg-slate-100 dark:bg-slate-600"
			>
				<Navigation inSheet={true} />
			</SheetContent>
		</Sheet>
	);
}
