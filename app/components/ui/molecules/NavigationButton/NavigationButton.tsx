import { type FC } from "react";
import { ActiveLink } from "../../atoms/ActiveLink";
import { type NavigationT } from "./type";

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
