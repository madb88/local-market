export default function CompanyLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="h-screen w-full p-1 pt-3 md:p-5">
				<div className="h-fit rounded-md bg-slate-300 pb-10 shadow-md dark:bg-slate-600">
					{children}
				</div>
			</div>
		</>
	);
}
