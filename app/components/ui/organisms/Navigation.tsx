export default function Navigation() {
	const categories = ["Elektronika", "Ogród", "Dom", "Firmy"];

	return (
		<div className="h-full bg-slate-300">
			<ul>
				{categories.map((categoryItem) => {
					return <li>{categoryItem}</li>;
				})}
			</ul>
		</div>
	);
}
