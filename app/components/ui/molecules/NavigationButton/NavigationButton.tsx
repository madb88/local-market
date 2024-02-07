import Link from "next/link";
import { type FC } from "react";
import { Button } from "../../atoms/button";
import { type NavigationT } from "./type";
import { ActiveLink } from "../../atoms/ActiveLink";

const NavigationButton: FC<NavigationT> = ({ text, size, url, icon }) => {
	return (
		<>
			<Button size={size} className="px-4">
				<ActiveLink key={text} href={url}>
					<span className="flex w-full gap-5">
						<div className="">{icon}</div>
						<div className="">{text}</div>
					</span>
				</ActiveLink>
			</Button>
		</>
	);
};

export default NavigationButton;
