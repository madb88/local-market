import { ModeToggle } from "../../toggle-mode";

export default function SearchBar() {
	return (
		<div className="grid-cols-searchNavigation md:grid-cols-searchNavigationMid grid grid-rows-2 bg-slate-100 dark:bg-black md:grid-rows-1 md:px-10 md:py-5 md:pt-6">
			<div className="">Logo</div>
			<div className="order-4 col-span-2 md:order-2 md:col-span-1">SearchInput</div>
			<div className="order-2 md:order-3">User Icons</div>
			<div className="order-3 flex justify-end px-10">
				<ModeToggle />
			</div>
		</div>
	);
}
