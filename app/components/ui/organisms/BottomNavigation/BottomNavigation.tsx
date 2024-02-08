import { Home, List, User } from "lucide-react";
import BottomNavigationButton from "../../molecules/BottomNavigationButton/BottomNavigationButton";
import BottomNavigationCategories from "./NavigationElements/BottomNavigationCategories";

export default function BottomNavigation() {
	return (
		<div className="grid h-full grid-cols-3">
			<BottomNavigationButton>
				<Home />
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
