"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import BottomNavigationButton from "../../molecules/BottomNavigationButton/BottomNavigationButton";
import BottomNavigationCategories from "./NavigationElements/BottomNavigationCategories";
import BottomNavigationUser from "./NavigationElements/BottomNavigationUser";

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
				<BottomNavigationUser />
			</BottomNavigationButton>
		</div>
	);
}
