import { Calculator, Flower2, LampFloor, Hammer } from "lucide-react";
import NavigationButton from "../molecules/NavigationButton/NavigationButton";

export default function Navigation() {
	const categories = [
		{ name: "Elektronika", url: "/categories/elektronika", icon: <Calculator /> },
		{ name: "Ogród", url: "/categories/ogrod", icon: <Flower2 /> },
		{ name: "Dom", url: "/categories/dom", icon: <LampFloor /> },
		{ name: "Firmy", url: "/companies", icon: <Hammer /> },
	];

	return (
		<div className="flex h-full bg-slate-300 dark:bg-black">
			<ul className="space-y-2">
				{categories.map((categoryItem) => {
					return (
						<li key={categoryItem.url}>
							<NavigationButton
								text={categoryItem.name}
								size="navigation"
								url={categoryItem.url}
								icon={categoryItem.icon}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
