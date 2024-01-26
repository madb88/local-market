import { FC } from "react";
import { Button } from "../../atoms/button";
import type { NavigationButtonType } from "./types";

const NavigationButton: FC<NavigationButtonType> = ({ children }) => {
	return (
		<Button size="sm">
			<p>{children}</p>
		</Button>
	);
};

export default NavigationButton;
