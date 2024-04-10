export default function PageInfoLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="w-screen pt-10">{children}</div>
		</>
	);
}
