"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	// eslint-disable-next-line @typescript-eslint/unbound-method
	return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
}
