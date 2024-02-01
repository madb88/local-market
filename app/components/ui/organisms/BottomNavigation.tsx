import { Home, List, User } from "lucide-react";
import BottomNavigationButton from "../molecules/BottomNavigationButton/BottomNavigationButton";

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
