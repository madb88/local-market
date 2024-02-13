"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function BackButton() {
	const router = useRouter();

	return (
		<Button variant={"outline"} onClick={() => router.back()}>
			Wróć
		</Button>
	);
}
