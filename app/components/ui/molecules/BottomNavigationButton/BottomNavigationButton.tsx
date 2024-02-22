import { type FC } from "react";
import { Button } from "../../atoms/button";
import { type TNavigationButton } from "./type";

const BottomNavigationButton: FC<TNavigationButton> = ({ children }) => {
	return (
		<Button size="full" variant="ghost" aria-label="Link nawigacji">
			{children}
		</Button>
	);
};

export default BottomNavigationButton;
