import { checkContact } from "@/app/utils/checkIfMessangerAvailable";
import { Button } from "@nextui-org/react";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";

export default function ContactAuthor() {
	const { messangerId, number } = checkContact();

	return (
		<div className="flex gap-2">
			{messangerId ? (
				<Link href={`https://m.me/${messangerId}`} target="_blank">
					<Button color="primary">
						<MessageCircleMore /> Kontakt przez messanger'a
					</Button>
				</Link>
			) : (
				"Brak profilu FB w ustawieniach"
			)}
			{number ? (
				<Link href={` https://wa.me/${number}`} target="_blank">
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
