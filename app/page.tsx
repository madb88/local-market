import Navigation from "./components/ui/organisms/Navigation";
import HomeInfo from "./components/ui/organisms/HomeInfo";

export default function Home() {
	return (
		<main className="flex h-screen flex-col bg-slate-500 px-40 md:flex-row md:overflow-hidden">
			<Navigation />
			<HomeInfo />
		</main>
	);
}
