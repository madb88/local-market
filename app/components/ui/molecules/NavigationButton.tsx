import { FC } from "react";
import { Button } from "../atoms/button";

type NavigationButtonType = {
	children: string;
};

const NavigationButton: FC<NavigationButtonType> = ({ children }) => {
	return (
		<Button size="sm">
			<p>{children}</p>
		</Button>
	);
};

export default NavigationButton;
