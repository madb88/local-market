"use client";
import { deleteCompanyImageAction } from "@/app/actions/deleteCompanyImageAction";
import { Button } from "@/app/components/ui/atoms/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

export default function DeleteImage({
	imageKey,
	removeImage,
}: {
	imageKey: string;
	removeImage: (image: string) => void;
}) {
	async function deleteFunc(imageKey: string) {
		const { success } = await deleteCompanyImageAction(imageKey);
		if (success) {
			removeImage(imageKey);
			toast.success("Zdjecie usunięte");
		}
	}

	return (
		<Button variant={"destructive"} onClick={() => deleteFunc(imageKey)} size={"icon"}>
			<Trash />
		</Button>
	);
}
