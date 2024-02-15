"use client";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { Button } from "@/app/components/ui/atoms/button";
import { useUser } from "@clerk/nextjs";
import { Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type CompanyHeaderT = {
	authorId: string | null;
};

export default function CompanyHeader({ authorId }: CompanyHeaderT) {
	const pathname = usePathname();

	const { user } = useUser();

	return (
		<div className="flex gap-5">
			<Button aria-label="Do ulubionych" size="icon" variant="outline">
				<Star />
			</Button>
			{user && user.id === authorId ? (
				<Button variant="outline">
					<Link href={`${pathname}/edit`}>
						<p className="text-base">Edytuj</p>
					</Link>
				</Button>
			) : null}
			<BackButton />
		</div>
	);
}
