"use client";

import { Button, Spinner } from "@nextui-org/react";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function DeleteOfferButton() {
	const { pending,  } = useFormStatus();

	return (
		<Button
			type="submit"
			isIconOnly
			color="danger"
			aria-label="Skasuj oferte"
			aria-disabled={pending}
		>
			{pending ? <Spinner color="primary" /> : <Trash />}
		</Button>
	);
}
