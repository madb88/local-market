"use server";
import { currentUser } from "@clerk/nextjs";

export default async function DashboardPage() {
	const user = await currentUser();

	return (
		<>Główna strona</>
		// <div className="px-2 pt-2 md:px-5">
		// 	<Card>
		// 		<CardBody>
		// 			<div className="flex space-x-2">
		// 				<p>Panel Uzytkownika</p>
		// 				<p className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
		// 					{/* {user?.firstName} {user?.lastName} */}
		// 				</p>
		// 			</div>
		// 		</CardBody>
		// 	</Card>
		// 	<div className="w-full pt-2">{user ? <HomePage /> : "Brak uzytkownika"}</div>
		// </div>
	);
}
