import { FC } from "react";
import { Button } from "@radix-ui/themes";

type NavigationButton = {
	children: string;
};

const NavigationButton: FC<NavigationButton> = ({ children }) => {
	return <Button className="">{children}</Button>;
};

export default NavigationButton;
