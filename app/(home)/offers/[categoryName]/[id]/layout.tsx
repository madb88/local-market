export default function OfferLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="h-full w-full pt-3 md:px-5">
				<div className="h-fit rounded-md bg-slate-200 pb-10 shadow-md dark:bg-slate-800">
					{children}
				</div>
			</div>
		</>
	);
}
