import Footer from "../components/ui/molecules/Footer";
import BottomNavigation from "../components/ui/organisms/BottomNavigation/BottomNavigation";
import Navigation from "../components/ui/organisms/Navigation";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="flex h-full flex-col overflow-hidden dark:bg-slate-600 md:h-screen md:flex-row">
				<div className="order-2 hidden md:order-1 md:flex">
					<Navigation inSheet={false} />
				</div>
				<div className="order-1 w-screen pb-12 md:order-2">{children}</div>
			</div>
			<div className=" fixed bottom-0 z-50 w-full">
				<div className="hidden md:block">
					<Footer />
				</div>

				<div className="order-3 h-16 bg-slate-300 dark:bg-black md:hidden">
					<BottomNavigation />
				</div>
			</div>
		</>
	);
}
