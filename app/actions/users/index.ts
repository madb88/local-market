"use server";

import { createClerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateUser({
	id,
	messengerId,
	number,
	email,
	firstName,
	lastName,
}: {
	messengerId: string;
	number: string;
	id: string;
	email: string;
	firstName: string;
	lastName: string;
}) {
	const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

	const userTest = await clerk.users.getUser(id);
	const test2 = userTest.publicMetadata;
	try {
		await clerk.users.updateUser(id as string, {
			publicMetadata: {
				...test2,
				messengerId: messengerId,
				number: number,
				email: email,
			},
			firstName: firstName,
			lastName: lastName,
		});
		revalidatePath("dashboard/user");
		return { message: "Dane zostały zaktualizowane", code: "success" };
	} catch (err) {
		return { message: "Błąd", code: "error" };
	}
}
