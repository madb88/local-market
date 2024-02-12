import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import SearchBar from "./components/ui/organisms/SearchBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Local Market",
	description: "Local Market app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={`${inter.className} bg-slate-100 dark:bg-slate-600`}>
					<Toaster position="top-center" richColors />
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<div className="sticky top-0 z-50">
							<SearchBar />
						</div>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
