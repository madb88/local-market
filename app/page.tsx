import Navigation from "./components/ui/organisms/Navigation";
import HomeInfo from "./components/ui/organisms/HomeInfo";
import BottomNavigation from "./components/ui/organisms/BottomNavigation/BottomNavigation";

export default function Home() {
	return (
		<>
			<main className="flex flex-col bg-slate-500 md:flex-row md:overflow-hidden">
				<div className="order-2 hidden md:order-1 md:flex">
					<Navigation />
				</div>
				<div className="order-1 h-screen md:order-2">
					<HomeInfo />
				</div>
			</main>
			<div className="fixed bottom-0 w-full">
				<div className="order-3 h-16 bg-slate-300 dark:bg-black md:hidden">
					<BottomNavigation />
				</div>
			</div>
		</>
	);
}
