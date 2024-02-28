import { Divider } from "@nextui-org/react";
import { Computer, Flower2, Hammer, LampFloor, User } from "lucide-react";
import ButtonLink from "../atoms/ButtonLink";
import NavigationButton from "../molecules/NavigationButton/NavigationButton";

type NavigationT = {
	inSheet: boolean;
};

export default function Navigation({ inSheet }: NavigationT) {
	const categories = [
		{ name: "Elektronika", url: "/offers/elektronika", icon: <Computer /> },
		{ name: "Ogród", url: "/offers/ogrod", icon: <Flower2 /> },
		{ name: "Dom", url: "/offers/dom", icon: <LampFloor /> },
		{ name: "Firmy", url: "/companies", icon: <Hammer /> },
	];

	return (
		<div className="flex h-full flex-col  bg-slate-200 px-1 pt-2.5 dark:bg-slate-600">
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
			{!inSheet && (
				<div className="flex flex-col justify-center pt-10">
					<Divider />
					<div className="flex justify-center pt-10">
						<ButtonLink
							link="/dashboard/user"
							label="Profil"
							style="shadow-md bg-gradient-to-tr from-green-700 to-green-500"
							startContent={<User />}
						>
							Panel Uzytkownika
						</ButtonLink>
					</div>
				</div>
			)}
		</div>
	);
}
