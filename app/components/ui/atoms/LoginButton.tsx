"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";

export default function LoginButton() {
	const { isSignedIn } = useUser();

	return !isSignedIn ? (
		<SignInButton>
			<Button color="primary" variant="bordered" aria-label="Zaloguj sie">
				Zaloguj się
			</Button>
		</SignInButton>
	) : (
		<SignOutButton>
			<Button color="primary" variant="bordered" aria-label="Wyloguj sie">
				Wyloguj się
			</Button>
		</SignOutButton>
	);
}
