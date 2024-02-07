"use client";

import { type UrlObject } from "node:url";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { Route } from "next";

type ActiveLinkProps = {
	href: Route<string> | UrlObject;
	children: React.ReactNode;
	exact?: boolean;
};

export const ActiveLink = ({ href, children, exact = false }: ActiveLinkProps) => {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href as Route);

	const className = "text-white-500 hover:text-gray-900 w-full";
	const activeClassName = "text-gray-900";

	return (
		<Link
			href={href}
			className={clsx(className, isActive && activeClassName)}
			aria-current={isActive ? "page" : undefined}
		>
			{children}
		</Link>
	);
};
