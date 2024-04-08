export default function CategoryPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="h-full bg-slate-100 px-2  dark:bg-slate-600 md:px-5">{children}</div>
		</>
	);
}
