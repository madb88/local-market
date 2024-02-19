import { checkIfMessangerAvailable } from "@/app/utils/checkIfMessangerAvailable";
import { Button } from "@nextui-org/react";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";

export default function ContactAuthor() {
	const { messangerId } = checkIfMessangerAvailable();

	return messangerId ? (
		<Link href={`https://m.me/${messangerId}`} target="_blank">
			<Button color="primary">
				<MessageCircleMore /> Kontakt przez messanger'a
			</Button>
		</Link>
	) : (
		"Brak profilu FB w ustawieniach"
	);
}
