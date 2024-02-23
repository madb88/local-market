"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function LoginButton() {
	const { isSignedIn } = useUser();
	const router = useRouter();

	return !isSignedIn ? (
		<SignInButton>
			<Button color="primary" variant="bordered" aria-label="Zaloguj sie">
				Zaloguj się
			</Button>
		</SignInButton>
	) : (
		<SignOutButton signOutCallback={() => router.push("/")}>
			<Button color="danger" variant="flat" aria-label="Wyloguj sie">
				Wyloguj się
			</Button>
		</SignOutButton>
	);
}
