import { type FC } from "react";
import { type NavigationT } from "./type";
import { ActiveLink } from "../../atoms/ActiveLink";

const NavigationButton: FC<NavigationT> = ({ text, url, icon, inSheet }) => {
	return (
		<>
			<ActiveLink key={text} href={url} button={true} inSheet={inSheet}>
				<span className="flex w-full gap-5 px-10">
					<div>{icon}</div>
					<div>{text}</div>
				</span>
			</ActiveLink>
		</>
	);
};

export default NavigationButton;
