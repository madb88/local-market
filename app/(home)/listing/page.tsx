export default async function ListingPage({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] };
}) {
	console.log(searchParams);
	return (
		<>
			Szukasz {searchParams.searchKeyWord} w {searchParams.filter}
		</>
	);
}
