"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide hover:text-blue-400 transition duration-300"
        >
          My Ecommerce
        </Link>
        <div className="hidden md:flex space-x-8 text-lg">
          <Link
            href="/"
            className="hover:text-blue-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-blue-400 transition duration-300"
          >
            Products
          </Link>
          <Link
            href="/checkout"
            className="hover:text-blue-400 transition duration-300"
          >
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-7 w-7 text-white hover:text-blue-400 transition duration-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            className="md:hidden text-white hover:text-blue-400 transition duration-300"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-gray-900 shadow-md p-4">
          <ul className="flex flex-col space-y-4 text-lg">
            <li>
              <Link
                href="/"
                className="block text-white hover:text-blue-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="block text-white hover:text-blue-400 transition duration-300"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="block text-white hover:text-blue-400 transition duration-300"
              >
                Checkout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
