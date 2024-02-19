import { Calculator, Flower2, Hammer, LampFloor } from "lucide-react";
import NavigationButton from "../molecules/NavigationButton/NavigationButton";

type NavigationT = {
	inSheet: boolean;
};

export default function Navigation({ inSheet }: NavigationT) {
	const categories = [
		{ name: "Elektronika", url: "/offers/elektronika", icon: <Calculator /> },
		{ name: "Ogród", url: "/offers/ogrod", icon: <Flower2 /> },
		{ name: "Dom", url: "/offers/dom", icon: <LampFloor /> },
		{ name: "Firmy", url: "/companies", icon: <Hammer /> },
	];

	return (
		<div className="dark:bg-black-300 flex h-full px-1 pt-2.5">
			<ul className="space-y-2">
				{categories.map((categoryItem) => {
					return (
						<li key={categoryItem.name}>
							<NavigationButton
								text={categoryItem.name}
								url={categoryItem.url}
								icon={categoryItem.icon}
								inSheet={inSheet}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
