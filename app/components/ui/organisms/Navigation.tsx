import NavigationButton from "../molecules/NavigationButton/NavigationButton";
import { Calculator, Flower2, LampFloor, Hammer } from "lucide-react";

export default function Navigation() {
	const categories = [
		{ name: "Elektronika", url: "elektronika", icon: <Calculator /> },
		{ name: "Ogród", url: "ogrod", icon: <Flower2 /> },
		{ name: "Dom", url: "dom", icon: <LampFloor /> },
		{ name: "Firmy", url: "firmy", icon: <Hammer /> },
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
