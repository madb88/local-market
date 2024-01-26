import { type FC } from "react";
import { Button } from "../../atoms/button";
import { INavigationButton } from "./interface";

const NavigationButton: FC<INavigationButton> = ({ children }) => {
	return (
		<Button size="sm">
			<p>{children}</p>
		</Button>
	);
};

export default NavigationButton;
