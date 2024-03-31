import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
	title: "JTing Ridan ToDo",
	description: "Stuff JTing and Ridan plan to do together.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen min-w-screen">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
