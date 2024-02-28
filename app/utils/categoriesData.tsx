import { Computer, Flower2, LampFloor } from "lucide-react";

export type CategoriesT = {
	key: string;
	value: string;
	label: string;
	icon?: JSX.Element;
};

export type CategoriesWithKeysT = {
	[key: string]: {
		key: string;
		value: string;
		label: string;
	};
};

export const categories: CategoriesT[] = [
	{ key: "elektronika", value: "elektronika", label: "Elektronika", icon: <Computer /> },
	{ key: "dom", value: "dom", label: "Dom", icon: <LampFloor /> },
	{ key: "ogrod", value: "ogrod", label: "Ogród", icon: <Flower2 /> },
];

export const categoriesWithKeys: CategoriesWithKeysT = {
	elektronika: {
		key: "elektronika",
		value: "elektronika",
		label: "Elektronika",
	},
	dom: { key: "dom", value: "dom", label: "Dom" },
	ogrod: { key: "ogrod", value: "ogrod", label: "Ogród" },
	all: { key: "all", value: "all", label: "Wszytkie kategorie" },
};
