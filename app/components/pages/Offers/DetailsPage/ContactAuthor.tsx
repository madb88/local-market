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
		<div className="flex flex-col gap-2 md:flex-row">
			{contactOptions.messanger ? (
				<Button
					className="bg-gradient-to-tr from-blue-500 to-pink-500 shadow-lg"
					aria-label="Kontakt przez messanger"
				>
					<Link href={`https://m.me/${userInfo.userInfo.messengerId}`} target="_blank">
						<p className="flex gap-2 text-white dark:text-slate-950">
							<MessageCircleMore /> Messenger
						</p>
					</Link>
				</Button>
			) : null}
			{contactOptions.whatsapp ? (
				<Button
					className="bg-gradient-to-tr from-green-700 to-green-500 shadow-lg"
					aria-label="Kontakt przez whatsapp"
				>
					<Link href={`https://wa.me/${userInfo.userInfo.number}`} target="_blank">
						<p className="flex gap-2 text-white dark:text-slate-950">
							<MessageCircleMore /> Whatsapp
						</p>
					</Link>
				</Button>
			) : null}
			{contactOptions.email ? (
				<Button
					className="bg-gradient-to-tr from-blue-700 to-blue-500 shadow-lg"
					aria-label="Kontakt przez email"
				>
					<Link href={`mailto:${userInfo.userInfo.email}`} target="_blank">
						<p className="flex gap-2 text-white dark:text-slate-950">
							<Mail /> Email
						</p>
					</Link>
				</Button>
			) : null}
		</div>
	);
}
