"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useStoreFavorites } from "@/store/favorite.store";
import { ModeToggle } from "./toggleDark";
import { useAddtoCard } from "@/store/addToCard.store";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "Help", href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { selectedFavoriteIds } = useStoreFavorites();
  const { selectedCardIds } = useAddtoCard();

  // FIXED HERE: Query must be a string
  const [Query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Query.trim()) return;
    router.push(`/search?query=${Query}`);
  };

  return (
    <nav
      className={`${
        scrolled
          ? "w-[90%] md:w-[70%] top-10 left-[7%] right-[15%] md:left-[15%] rounded-full ring ring-gray-300"
          : "w-full top-0"
      } fixed h-[70px] px-5 sm:px-10 flex items-center justify-between transition-all duration-300 shadow-sm backdrop-blur-md z-50`}
    >
      {/* Logo */}
      <h1 className="font-extrabold text-2xl md:text-3xl">ShopVerse</h1>

      {/* Desktop Links */}
      <div className="hidden lg:flex gap-8">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`${
              path === link.href
                ? "text-amber-600 font-bold"
                : "text-gray-900 dark:text-white"
            } font-medium hover:text-orange-500 transition`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Search + Icons */}
      <div className="flex gap-5 items-center">

        {/* Desktop Search */}
        <form onSubmit={handleSubmit}>
          <div className="hidden lg:flex px-3 py-2 bg-gray-200 dark:bg-gray-800 items-center rounded-full gap-2">
            <CiSearch size={20} />
            <input
              type="text"
              value={Query}
              placeholder="Search for Phones"
              className="bg-transparent outline-none text-sm w-32"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative cursor-pointer">
            <Link href="/favorites">
              <FaRegHeart size={22} />
              <span className="absolute w-4 h-4 flex justify-center items-center rounded-full bg-red-500 text-white text-[10px] -right-2 -bottom-1">
                {selectedFavoriteIds.length}
              </span>
            </Link>
          </div>

          <div className="relative cursor-pointer">
            <FiShoppingBag size={22} />
            <span className="absolute w-4 h-4 flex justify-center items-center rounded-full bg-red-500 text-white text-[10px] -right-2 -bottom-1">
              {selectedCardIds.length}
            </span>
          </div>

          <ModeToggle />

          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-amber-600 text-white rounded-md">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden gap-4 items-center">
          <div className="relative">
            <FaRegHeart size={24} />
            <span className="absolute w-4 h-4 flex justify-center items-center rounded-full bg-red-500 text-white text-[10px] -right-2 -bottom-1">
              {selectedFavoriteIds.length}
            </span>
          </div>

          <div className="relative">
            <FiShoppingBag size={24} />
            <span className="absolute w-4 h-4 flex justify-center items-center rounded-full bg-red-500 text-white text-[10px] -right-2 -bottom-1">
              {selectedCardIds.length}
            </span>
          </div>

          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-amber-600 text-white rounded-md">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Hamburger toggle */}
        <button
          className="lg:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[70px] dark:bg-black left-0 w-full bg-white shadow-md flex flex-col gap-5 px-6 py-5 lg:hidden z-40 animate-slideDown">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                path === link.href
                  ? "text-amber-600 font-bold"
                  : "text-gray-900 dark:text-white"
              } font-medium text-lg py-2 hover:text-orange-500 transition`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex gap-3 items-center">
            <ModeToggle />
            <span>Theme</span>
          </div>

          {/* Mobile Search */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-full w-full">
            <CiSearch size={20} />
            <input
              type="text"
              placeholder="Search for Phones"
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
