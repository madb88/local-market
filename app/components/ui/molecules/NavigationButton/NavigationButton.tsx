import { type FC } from "react";
import { Button } from "../../atoms/button";
import { type TNavigationButton } from "./type";

const NavigationButton: FC<TNavigationButton> = ({ children }) => {
	return (
		<Button size="sm">
			<p>{children}</p>
		</Button>
	);
};

export default NavigationButton;
