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
        <Image src="images/image.png" alt="Branding" width={45} height={45} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Scouting
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {/* <Button
          as="span"
          className="cursor-pointer"
          onClick={() => {
            setDebug((isDebug) => !isDebug );
          }}
        >
          Debug Mode
        </Button> */}
        <DarkThemeToggle />
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {/* See comment bellow */}
        {/* <Link href="/drafts" passHref>
        </Link> */}
        <NavbarLink
          as={"button"}
          active
          onClick={() => {
            router.push("/drafts");
          }}
        >
          Drafts
        </NavbarLink>

        {/* Using Link to handle linking via basePath for you? */}

        <NavbarLink
          as={"button"}
          active
          onClick={() => {
            router.push("/auto");
          }}
        >
          Mock passing new draft
        </NavbarLink>

        <NavbarLink
          as={"button"}
          active
          onClick={() => {
            router.push("/leaderboard");
          }}
        >
          Leaderboard
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
