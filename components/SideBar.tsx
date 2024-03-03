"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  ScanEye,
  Images,
  Eraser,
  Paintbrush,
  GalleryVerticalEnd,
  UserRound,
  Coins,
} from "lucide-react";
import Image from "next/image";

export const navigationLinks = [
  {
    label: "Home",
    route: "/",
    icon: <LayoutDashboard />,
  },
  {
    label: "Image Restore",
    route: "/changes/new/restore",
    icon: <ScanEye />,
  },
  {
    label: "Generative Fill",
    route: "/changes/new/fill",
    icon: <Images />,
  },
  {
    label: "Object Remove",
    route: "/changes/new/remove",
    icon: <Eraser />,
  },
  {
    label: "Object Recolor",
    route: "/changes/new/recolor",
    icon: <Paintbrush />,
  },
  {
    label: "Background Remove",
    route: "/changes/new/removeBackground",
    icon: <GalleryVerticalEnd />,
  },
  {
    label: "Profile",
    route: "/profile",
    icon: <UserRound />,
  },
  {
    label: "Buy Credits",
    route: "/credits",
    icon: <Coins />,
  },
];
const SideBar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-72 bg-white p-5 shadow-md shadow-purple-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 md:py-2">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
          <p className="text1 text-3xl  text-[#9b62c0]">Re-Touch</p>
        </Link>
        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
            <ul className="hidden w-full flex-col items-start gap-2 md:flex">
              {navigationLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`flex justify-center items-center font-semibold text-[16px] leading-[140%] w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-[#d7bcd5] hover:shadow-inner group ${
                      isActive
                        ? "bg-[#f6d7f4] text-black shadow-inner"
                        : "text-gray-700"
                    }`}
                  >
                    <Link
                      href={link.route}
                      className="font-semibold  text-[16px] leading-[140%] flex size-full gap-4 p-4"
                    >
                      <p
                        className={`${
                          isActive ? "text-black" : "text-gray-700"
                        }`}
                      >
                        {link.icon}
                      </p>

                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="hidden w-full flex-col items-start gap-2 md:flex">
              {navigationLinks.slice(6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`flex-center font-semibold text-[16px] leading-[140%] w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-purple-100 hover:shadow-inner group ${
                      isActive
                        ? "bg-purple-100 text-black shadow-inner"
                        : "text-gray-700"
                    }`}
                  >
                    <Link
                      href={link.route}
                      className="font-semibold text-[16px] leading-[140%] flex size-full gap-4 p-4 cursor-pointer"
                    >
                      <p
                        className={`${
                          isActive ? "text-white" : "text-gray-700"
                        }`}
                      >
                        {link.icon}
                      </p>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="flex justify-center items-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName={true} />
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button
              asChild
              className="py-4 px-6 flex justify-center items-center gap-3 rounded-full font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent bg-purple-400 bg-cover hover:bg-purple-500 hover:shadow-inner"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
