export default function AddNewCompanyLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="h-screen w-full px-10 pt-3">
				<div className="h-5/6 rounded-md bg-slate-300 shadow-md dark:bg-slate-900">{children}</div>
			</div>
		</>
	);
}
