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
	const messangerId = user?.publicMetadata.messangerId as string;
	const number = user?.publicMetadata.number as string;
	return (
		<div className="flex flex-col gap-2">
			Kontakt:
			{messangerId ? (
				<Link href={`https://m.me/${messangerId}`} target="_blank">
					<Button color="primary">
						<MessageCircleMore /> Messanger
					</Button>
				</Link>
			) : (
				"Brak profilu FB w ustawieniach"
			)}
			{number ? (
				<Link href={`https://wa.me/${number}`} target="_blank">
					<Button color="success">
						<MessageCircleMore /> Whatsapp
					</Button>
				</Link>
			) : (
				"Brak numeru telefonu w profilu"
			)}
		</div>
	);
}
