'use client'
import React from 'react'
import { navigationLinks } from './SideBar';
import Link from 'next/link';

const NavLink = () => {
  return (
    <>
      {navigationLinks.slice(1, 5).map((link) => (
        <Link
          key={link.route}
          href={link.route}
          className="flex justify-center items-center flex-col group gap-2 transition-all duration-300 ease-in"
        >
          <li className="flex justify-center items-center w-fit rounded-full bg-white p-4 group-hover:bg-[#e1e2e6] transition-all duration-300 ease-in ">
            {link.icon}
          </li>
          <p className="font-medium text-[14px] leading-[120%] text-center text-white group-hover:text-[#e1e2e6] transition-all duration-300 ease-in">
            {link.label}
          </p>
        </Link>
      ))}
    </>
  );
}

export default NavLink