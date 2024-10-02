"use client";
import { debugAtom } from "@/store/debug";
import {
  Button,
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";

export function Nav() {
  const [isDebug, setDebug] = useAtom(debugAtom);
  return (
    <Navbar fluid>
      <NavbarBrand as={Link} href="/">
        {/* <Image src="/image.png" alt="Branding"  width={45} height={45}/> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Scouting
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button
          as="span"
          className="cursor-pointer"
          onClick={() => {
            setDebug((isDebug) => !isDebug );
          }}
        >
          Debug Mode
        </Button>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {/* See comment bellow */}
        <Link href="/drafts" passHref>
          <NavbarLink active>Drafts</NavbarLink>
        </Link>
        {/* Using Link to handle linking via basePath for you? */}
        {/* <NavbarLink as={Link} href="#">
          About
        </NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink> */}
      </NavbarCollapse>
    </Navbar>
  );
}
