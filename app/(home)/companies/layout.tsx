export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full bg-slate-100 px-2 pb-20 dark:bg-slate-600 md:h-screen md:px-5">
			{children}
		</div>
	);
}
