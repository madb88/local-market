import BottomNavigationButton from "../molecules/BottomNavigationButton/BottomNavigationButton";
import { Home, List, User } from "lucide-react";

export default function BottomNavigation() {
	return (
		<div className="grid h-full grid-cols-3">
			<BottomNavigationButton>
				<Home />
			</BottomNavigationButton>
			<BottomNavigationButton>
				<List />
			</BottomNavigationButton>
			<BottomNavigationButton>
				<User />
			</BottomNavigationButton>
		</div>
	);
}
