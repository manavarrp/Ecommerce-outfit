"use client";

import { titleFont } from "@/config/font";
import { useUIStore } from "@/store/ui/ui-store";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openSidebar = useUIStore((state) => state.openSidebar);
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div className="">
        <Link href={"/"}>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Ecommerce Outfit
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      {/*Center Menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/men"}
        >
          Hombres
        </Link>

        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/women"}
        >
          Mujeres
        </Link>

        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href={"/gender/kid"}
        >
          Niños
        </Link>
      </div>
      {/* Search , Cart Right Menu */}
      <div className="flex items-center">
        <Link href={"/search"} className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={"/cart"} className="mx-2">
          <div className="relative">
            <span className="absolute px-1 text-xs rounded-full  font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          onClick={openSidebar}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
