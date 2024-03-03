"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";
import { AlignRight } from "lucide-react";
import { navigationLinks } from "./SideBar";
import { usePathname } from "next/navigation";
import Image from "next/image";

const MobileNavBar = () => {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center fixed h-16 w-full border-b-4 border-purple-100 bg-white p-5 lg:hidden">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image src="/logo.svg" alt="logo" width={35} height={35} />
        <p className="text1 text-2xl  text-[#9b62c0]">Re-Touch</p>
      </Link>
      <nav className="flex gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <AlignRight className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="focus:ring-0 focus-visible:ring-transparent focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-none sm:w-64">
              <>
                <div className="flex items-center justify-center gap-2">
                  <Image src="/logo.svg" alt="logo" width={35} height={35} />
                  <p className="text1 text-2xl  text-[#9b62c0]">Re-Touch</p>
                </div>
                <ul className="mt-8 flex w-full flex-col items-start gap-5">
                  {navigationLinks.map((link) => {
                    const isActive = link.route === pathname;
                    return (
                      <li
                        key={link.route}
                        className={`${
                          isActive &&
                          "bg-purple-100 bg-cover bg-clip-text text-transparent"
                        } p-18 flex whitespace-nowrap text-[#384262]`}
                      >
                        <Link
                          href={link.route}
                          className={` font-semibold text-[16px] leading-[140%] flex items-center size-full gap-4 p-4 cursor-pointer`}
                        >
                          <p
                            className={`${
                              isActive ? "text-[#9b62c0]" : "text-gray-700"
                            }`}
                          >
                            {link.icon}
                          </p>
                          <p
                            className={`${
                              isActive ? "text-[#9b62c0]" : "text-gray-700"
                            }`}
                          >
                            {link.label}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Link
            href="/sign-in"
            className="py-2 px-3 flex items-center justify-center gap-3 rounded-full text-white font-semibold text-[16px] leading-[140%] focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent bg-purple-400 bg-cover hover:bg-purple-500 hover:shadow-inner"
          >
            Sign In
          </Link>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNavBar;
