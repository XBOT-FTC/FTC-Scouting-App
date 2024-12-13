"use client";
import {
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Nav() {
  const router = useRouter();
  return (
    <Navbar fluid>
      <NavbarBrand as={Link} href="/">
        <Image src="images/image.png" alt="Branding" height={45} width={45} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Scouting
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <DarkThemeToggle />
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink
          onClick={() => router.push("/leaderboard")}
          as={"button"}
          active
        >
          Leaderboard
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
