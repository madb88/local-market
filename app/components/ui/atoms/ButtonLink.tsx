import { Button } from "@nextui-org/react";
import Link from "next/link";
import { type ReactNode } from "react";
import { SheetClose } from "./sheet";

type ButtonLinkT = {
	children: string;
	link: string;
	label: string;
	style?: string;
	variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined;
	target?: string;
	startContent?: ReactNode;
	isSheet?: boolean;
};

export default function ButtonLink({
	children,
	link,
	label,
	style,
	variant,
	target,
	startContent,
	isSheet,
}: ButtonLinkT) {
	return (
		<>
			{isSheet ? (
				<SheetClose asChild>
					<Button
						className={style}
						aria-label={label}
						variant={variant}
						startContent={startContent}
						as={Link}
						href={link}
						target={target}
					>
						<p className="flex gap-2  text-white">{children}</p>
					</Button>
				</SheetClose>
			) : (
				<Button
					className={style}
					aria-label={label}
					variant={variant}
					startContent={startContent}
					as={Link}
					href={link}
					target={target}
				>
					<p className="flex gap-2 text-white">{children}</p>
				</Button>
			)}
		</>
	);
}
