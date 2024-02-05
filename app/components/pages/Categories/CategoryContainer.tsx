import { type FC } from "react";
import { type CategoryContainerT } from "./type";

const CategoryContainer: FC<CategoryContainerT> = ({ name }) => {
	return <div>Kategoria: {name}</div>;
};

export default CategoryContainer;
