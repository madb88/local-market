import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import SearchBar from "./components/ui/organisms/SearchBar";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Local Market",
	description: "Local Market app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${inter.className} bg-slate-100 dark:bg-slate-600`}>
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
