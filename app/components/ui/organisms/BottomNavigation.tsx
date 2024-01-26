import NavigationButton from "../molecules/NavigationButton/NavigationButton";

export default function BottomNavigation() {
	return (
		<div className="grid h-full grid-cols-3">
			<NavigationButton>Start</NavigationButton>
			<NavigationButton>Kategorie</NavigationButton>
			<NavigationButton>Profil</NavigationButton>
		</div>
	);
}
