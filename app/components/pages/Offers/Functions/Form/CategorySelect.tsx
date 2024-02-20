import { Select, SelectItem } from "@nextui-org/react";

export default function CategorySelect({}) {
	const categories = [
		{ value: "elektronika", label: "Elektronika" },
		{ value: "dom", label: "Dom" },
		{ value: "ogrod", label: "Ogród" },
	];

	return (
		<Select
			items={categories}
			label="Kategoria"
			placeholder="Wybierz kategorię"
			className="max-w-xs"
		>
			{(category) => <SelectItem key={category.value}>{category.label}</SelectItem>}
		</Select>
	);
}
