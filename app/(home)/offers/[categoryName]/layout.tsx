export default function CategoryPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="h-full bg-slate-100 dark:bg-slate-600">{children}</div>
		</>
	);
}
