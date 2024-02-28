"use client";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { Edit, Star } from "lucide-react";
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
			<Button aria-label="Do ulubionych" isIconOnly>
				<Star />
			</Button>
			{user && user.id === authorId ? (
				<Button
					aria-label="Edytuj firme"
					className="shadow-lg"
					variant="ghost"
					color="primary"
					endContent={<Edit />}
				>
					<Link href={`${pathname}/edit`}>
						<p className="text-base">Edytuj</p>
					</Link>
				</Button>
			) : null}
			<BackButton />
		</div>
	);
}
