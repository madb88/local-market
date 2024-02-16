export default function CompanyLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="h-screen w-full px-5 pt-3">
				<div className="h-fit rounded-md bg-slate-300 pb-10 shadow-md dark:bg-slate-900">
					{children}
				</div>
			</div>
		</>
	);
}
