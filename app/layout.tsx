import "./globals.css";

import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import { Nav } from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description:
    "A Scouting Webapp made to scout data for FTC competitions to provide visually appealing and helpful data for both team 3231 and 2939",
  title: "FTC Scouting Webapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${inter.className} dark:bg-gray-800 dark:text-white`}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
