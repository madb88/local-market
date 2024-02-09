"use client";
import BackButton from "@/app/components/ui/atoms/BackButton";
import { Button } from "@/app/components/ui/atoms/button";
import { Star } from "lucide-react";

export default function CompanyHeader() {
	return (
		<div className="flex gap-5">
			<Button variant="ghost" size="icon">
				<Star />
			</Button>
			<BackButton />
		</div>
	);
}
