import Footer from "./components/ui/molecules/Footer";
import BottomNavigation from "./components/ui/organisms/BottomNavigation/BottomNavigation";
import HomeInfo from "./components/ui/organisms/HomeInfo";
import Navigation from "./components/ui/organisms/Navigation";

export default function Home() {
	return (
		<>
			<main className="flex flex-col md:flex-row md:overflow-hidden">
				<div className="order-2 hidden md:order-1 md:flex">
					<Navigation inSheet={false} />
				</div>
				<div className="order-1 h-screen md:order-2">
					<HomeInfo />
				</div>
				<Footer />
			</main>
			<div className="fixed bottom-0 z-50 w-full">
				<div className="order-3 h-16 bg-slate-300 dark:bg-black md:hidden">
					<BottomNavigation />
				</div>
			</div>
		</>
	);
}
