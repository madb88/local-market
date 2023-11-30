import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SearchBar from "./components/ui/organisms/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Local Market",
	description: "Local Market app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="sticky top-0">
					<SearchBar />
				</div>
				{children}
			</body>
		</html>
	);
}
