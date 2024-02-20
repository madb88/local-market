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
	const messangerId = user?.publicMetadata.messangerId;
	const number = user?.publicMetadata.number;
	return (
		<div className="flex gap-2">
			{messangerId ? (
				<Link href={`https://m.me/${messangerId}`} target="_blank">
					<Button color="primary">
						<MessageCircleMore /> Kontakt przez messangera
					</Button>
				</Link>
			) : (
				"Brak profilu FB w ustawieniach"
			)}
			{number ? (
				<Link href={`https://wa.me/${number}`} target="_blank">
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
