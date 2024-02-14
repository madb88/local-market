"use server";
import { utapi } from "@/lib/uploadApi";
import { revalidateTag } from "next/cache";

export async function deleteCompanyImageAction(imageKey: string) {
	const { success } = await utapi.deleteFiles(imageKey);
	revalidateTag("companyImage");

	if (success) {
		console.log(success);
		return { success };
	}

	return { success };
}
