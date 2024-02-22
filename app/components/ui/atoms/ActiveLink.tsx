"use client";

import clsx from "clsx";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type UrlObject } from "node:url";
import { Button } from "./button";
import { SheetClose } from "./sheet";

type ActiveLinkProps = {
	href: Route<string> | UrlObject;
	children: React.ReactNode;
	exact?: boolean;
	button?: boolean;
	inSheet?: boolean;
};

export const ActiveLink = ({
	href,
	children,
	exact = false,
	button = false,
	inSheet,
}: ActiveLinkProps) => {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href as Route);

	const className = "text-white-500 hover:text-gray-900 w-full";
	const activeClassName = "text-gray-900 border-b-2 border-gray-900";
	const buttonClassName = "flex w-full gap-5 h-full";

	return (
		<>
			{button ? (
				inSheet ? (
					<>
						<SheetClose asChild>
							<Link
								href={href}
								className={buttonClassName}
								aria-current={isActive ? "page" : undefined}
							>
								<Button
									type="submit"
									variant={isActive ? "active" : "default"}
									className={buttonClassName}
									aria-label="link nawigacji"
								>
									{children}
								</Button>
							</Link>
						</SheetClose>
					</>
				) : (
					<Link
						href={href}
						className={buttonClassName}
						aria-current={isActive ? "page" : undefined}
					>
						<Button
							type="submit"
							variant={isActive ? "active" : "default"}
							className={buttonClassName}
							aria-label="link nawigacji"
						>
							{children}
						</Button>
					</Link>
				)
			) : (
				<Link
					href={href}
					className={clsx(className, isActive && activeClassName)}
					aria-current={isActive ? "page" : undefined}
				>
					{children}
				</Link>
			)}
		</>
	);
};
