export default function CategoryPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="h-full bg-slate-100  px-2 pb-20 dark:bg-slate-600 md:px-5">{children}</div>
		</>
	);
}
