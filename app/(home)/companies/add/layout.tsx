export default function AddNewCompanyLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="h-screen w-full px-5 pt-3">
				<div className="h-6/6 rounded-md bg-slate-200 pb-5 shadow-md dark:bg-slate-600">
					{children}
				</div>
			</div>
		</>
	);
}
