export default function PageInfo() {
	return (
		<div className="flex flex-col justify-center px-10">
			<h1 className="flex justify-center text-large">Informacje o stronie</h1>
			<ul className="flex flex-col justify-center">
				<li key={"1"}>
					- Wszystkie oferty i firmy oznaczone jako do usunięcia kasowane są codziennie
				</li>
				<li key={"2"}>- Do kazdego ogloszenia mozna dodac jedno zdjecie</li>
				<li key={"3"}>- Oferty i firmy mogą dodawać jedynie autoryzowani uzytkownicy </li>
				<li key={"4"}>
					- Wszelkie pomysły co do rozwoju strony proszę kierować na kaminskiqba@gmail.com{" "}
				</li>
			</ul>
		</div>
	);
}
