"use client";

import { Button, Spinner } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function DeleteOfferButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" color="primary" aria-label="Skasuj oferte" aria-disabled={pending}>
			{pending ? <Spinner color="danger" /> : "Tak"}
		</Button>
	);
}
