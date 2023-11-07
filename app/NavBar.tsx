"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineBug } from "react-icons/ai";
import { Spinner } from "./components";

const NavBar = () => {
  return (
    <nav className=" border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link className="text-black" href="/">
              <AiOutlineBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Issues",
      href: "/issues/list",
    },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "font-semibold": true,
              "nav-link": true,
              "!text-zinc-900": currentPath === link.href,
            })}
            href={link.href}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading")
    return (
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Log in
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            referrerPolicy="no-referrer"
            className="cursor-pointer"
            radius="full"
            size="2"
            src={session!.user!.image!}
            fallback="?"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2" weight="bold">
              {session!.user?.email}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
