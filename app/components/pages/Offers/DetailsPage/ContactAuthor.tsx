"use client";
import { type AuthorT, type ContactOptionsT } from "@/lib/supabase/types";
import { Button } from "@nextui-org/react";
import { Mail, MessageCircleMore } from "lucide-react";
import Link from "next/link";

export default function ContactAuthor({
	contactOptions,
	userInfo,
}: {
	contactOptions: ContactOptionsT;
	userInfo: AuthorT;
}) {
	return (
		<div className="flex- ali flex gap-2 md:flex-row">
			Kontakt:
			{contactOptions.messanger ? (
				<Link href={`https://m.me/${userInfo.userInfo.messengerId}`} target="_blank">
					<Button className="bg-gradient-to-tr from-blue-500 to-pink-500 shadow-lg">
						<MessageCircleMore /> Messenger
					</Button>
				</Link>
			) : null}
			{contactOptions.whatsapp ? (
				<Link href={`https://wa.me/${userInfo.userInfo.number}`} target="_blank">
					<Button className="bg-gradient-to-tr from-green-700 to-green-500 shadow-lg">
						<MessageCircleMore /> Whatsapp
					</Button>
				</Link>
			) : null}
			{contactOptions.email ? (
				<Link href={`mailto:${userInfo.userInfo.email}`} target="_blank">
					<Button className="bg-gradient-to-tr from-blue-700 to-blue-500 shadow-lg">
						<Mail /> {`Email: ${userInfo.userInfo.email}`}
					</Button>
				</Link>
			) : null}
		</div>
	);
}
