"use client";

import { Home, User } from "lucide-react";
import Link from "next/link";
import BottomNavigationButton from "../../molecules/BottomNavigationButton/BottomNavigationButton";
import BottomNavigationCategories from "./NavigationElements/BottomNavigationCategories";

export default function BottomNavigation() {
	return (
		<div className="grid h-full grid-cols-3">
			<BottomNavigationButton>
				<Link href="/">
					<Home />
				</Link>
			</BottomNavigationButton>
			<BottomNavigationButton>
				<BottomNavigationCategories />
			</BottomNavigationButton>
			<BottomNavigationButton>
				<User />
			</BottomNavigationButton>
		</div>
	);
}
