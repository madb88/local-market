import { ourFileRouter } from "@/app/api/uploadthing/core";
import { plPL } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { extractRouterConfig } from "uploadthing/server";
import { ThemeProvider } from "./components/theme-provider";
import SearchBar from "./components/ui/organisms/TopNavigationBar";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Osiedlowe Targowisko",
	description: "Osiedlowe Targowisko",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Script
				id="Cookiebot"
				src="https://consent.cookiebot.com/uc.js"
				data-cbid="7adc617f-117b-404c-9297-fce08fde3a84"
				data-blockingmode="auto"
				type="text/javascript"
			></Script>
			<ClerkProvider
				localization={plPL}
				appearance={{
					baseTheme: dark,
					signIn: { baseTheme: neobrutalism },
				}}
			>
				<html lang="en" suppressHydrationWarning>
					<head></head>
					<body className={`${inter.className} h-screen bg-slate-100 dark:bg-slate-600`}>
						<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
						<Toaster position="top-center" richColors />
						<ThemeProvider
							attribute="class"
							defaultTheme="light"
							enableSystem
							disableTransitionOnChange
						>
							<div className="sticky top-0 z-50 ">
								<SearchBar />
							</div>
							<Providers>{children}</Providers>
							<Analytics />
						</ThemeProvider>
					</body>
				</html>
			</ClerkProvider>
		</>
	);
}
