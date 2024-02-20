"use client";
// import { checkContact } from "@/app/utils/checkIfMessangerAvailable";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";

export default function ContactAuthor() {
	const { user } = useUser();
	console.log(user);
	// const { messangerId, number } = checkContact();

	return (
		<div className="flex gap-2">
			{user?.publicMetadata.messangerId ? (
				<Link href={`https://m.me/${user?.publicMetadata.messangerId}`} target="_blank">
					<Button color="primary">
						<MessageCircleMore /> Kontakt przez messangera
					</Button>
				</Link>
			) : (
				"Brak profilu FB w ustawieniach"
			)}
			{user?.publicMetadata.number ? (
				<Link href={` https://wa.me/${user?.publicMetadata.number}`} target="_blank">
					<Button color="success">
						<MessageCircleMore /> Kontakt przez whatsappa
					</Button>
				</Link>
			) : (
				"Brak numeru telefonu w profilu"
			)}
		</div>
	);
}
