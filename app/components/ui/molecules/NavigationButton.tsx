import { FC } from "react";
import { Button } from "../atoms/button";

type NavigationButton = {
	children: string;
};

const NavigationButton: FC<NavigationButton> = ({ children }) => {
	return (
		<Button size="sm">
			<p>{children}</p>
		</Button>
	);
};

export default NavigationButton;
