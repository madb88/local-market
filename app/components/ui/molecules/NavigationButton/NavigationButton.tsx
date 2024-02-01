import Link from "next/link";
import { type FC } from "react";
import { type NavigationT } from "./type";
import { Button } from "../../atoms/button";

const NavigationButton: FC<NavigationT> = ({ text, size, url, icon }) => {
	return (
		<>
			<Button size={size} variant={"ghost"} asChild className="justify-start px-2">
				<Link href={"/categories/" + url} className="flex justify-start gap-2">
					{icon} {text}
				</Link>
			</Button>
		</>
	);
};

export default NavigationButton;
