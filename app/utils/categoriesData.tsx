import { Computer, Flower2, LampFloor } from "lucide-react";

export type CategoriesT = {
	key: string;
	value: string;
	label: string;
	icon?: JSX.Element;
};

export const categories: CategoriesT[] = [
	{ key: "elektronika", value: "elektronika", label: "Elektronika", icon: <Computer /> },
	{ key: "dom", value: "dom", label: "Dom", icon: <LampFloor /> },
	{ key: "ogrod", value: "ogrod", label: "Ogród", icon: <Flower2 /> },
];
