"use client";

import { type FC } from "react";
import { Button } from "../../atoms/button";
import { type NavigationT } from "./type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationButton: FC<NavigationT> = ({ text, size, url, icon }) => {
	const pathName = usePathname();

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
