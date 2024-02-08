"use client";
import { Button } from "@/app/components/ui/atoms/button";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CompanyHeader() {
	const router = useRouter();

	return (
		<div className="flex gap-5">
			<Button variant="ghost" size="icon">
				<Star />
			</Button>
			<Button onClick={() => router.back()}>Wróć</Button>
		</div>
	);
}
