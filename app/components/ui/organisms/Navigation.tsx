import { Divider } from "@nextui-org/react";
import { Computer, Flower2, Hammer, LampFloor, Triangle, User } from "lucide-react";
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
		{ name: "Własne wyroby", url: "/offers/wlasne-wyroby", icon: <Triangle /> },
		{ name: "Firmy", url: "/companies", icon: <Hammer /> },
	];

	return (
		<div className="flex h-full flex-col  bg-slate-100 px-1 pt-2.5 dark:bg-slate-600">
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
				<div className="flex w-full flex-col justify-center pt-10">
					<Divider />
					<div className="flex justify-center pt-10">
						<ButtonLink
							link="/dashboard/user"
							label="Profil"
							style="bg-gradient-to-tr from-orange-700 to-yellow-500 text-white shadow-lg"
							startContent={<User />}
						>
							Panel Użytkownika
						</ButtonLink>
					</div>
					<div className="flex justify-center pt-5">
						<ButtonLink
							link="/dashboard/admin"
							label="Profil"
							style="bg-gradient-to-tr from-purple-500 to-slate-800 text-white shadow-lg"
							startContent={<User />}
						>
							Panel Administratora
						</ButtonLink>
					</div>
				</div>
			)}
		</div>
	);
}
