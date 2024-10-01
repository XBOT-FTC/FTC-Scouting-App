"use client";
import { DarkThemeToggle, Navbar, useThemeMode } from "flowbite-react";

export default function Home() {
  const theme = useThemeMode();
  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <h1 className="text-2xl dark:text-white">
        Flowbite React + Next.js <div /> the current theme is: {theme.mode}
      </h1>
      <Navbar></Navbar>
      <DarkThemeToggle />
    </main>
  );
}
