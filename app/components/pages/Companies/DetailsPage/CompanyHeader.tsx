"use client";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { Button } from "@/app/components/ui/atoms/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CompanyHeader() {
	const pathname = usePathname();

	return (
		<div className="flex gap-5">
			<Button aria-label="Do ulubionych" size="icon" variant="outline">
				<Star />
			</Button>
			<Button variant="outline">
				<Link href={`${pathname}/edit`}>
					<p className="text-base">Edytuj</p>
				</Link>
			</Button>
			<BackButton />
		</div>
	);
}
