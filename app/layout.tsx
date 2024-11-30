import "./globals.css";

import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import { Foot } from "@/components/foot";
import { Nav } from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FTC Scouting Webapp",
  description:
    "A Scouting Webapp made to scout data for FTC competitions to provide visually appealing and helpful data for both team 3231 and 2939",
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
      <body
        className={`${inter.className} dark:bg-gray-800 dark:text-gray-100`}
      >
        <Nav />
        <main>{children}</main>
        <div className="mb-10 block" />
        <Foot />
      </body>
    </html>
  );
}
