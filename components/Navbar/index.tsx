"use client";
import { ReactElement } from "react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";
import { useAuthContext } from "@/components/contexts/useAuthContext";

const Navbar = (): ReactElement => {
  const { currentUser, logout } = useAuthContext();
  return (
    <header>
      <div className="fixed top-0 inset-x-0 bg-white dark:bg-gray-900 z-50 shadow-light dark:shadow-dark">
        <nav className="flex items-center justify-between text-gray-800 dark:text-gray-100 mx-auto px-6 py-4 md:py-5 xl:px-0 max-w-5xl">
          <Link href="/" className="flex items-center justify-between text-xl">
            <div className="font-semibold text-xl">
              Todo <span className="text-primary-400">App</span>
            </div>
          </Link>

          {/* Navbar links */}
          <div className="flex items-center text-base leading-5">
            <div className="hidden md:block">
              <Link href="/" className="px-1 md:px-4 font-semibold">
                Home
              </Link>

              {/* Show Dashboard and Logout only if user is logged in */}
              {currentUser ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-1 md:px-4 font-semibold"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="px-1 md:px-4 font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="px-1 md:px-4 font-semibold">
                  Login
                </Link>
              )}
            </div>

            {/* Show profile photo if user is logged in */}
            {currentUser && (
              <Link
                href="/profile"
                className="w-8 h-8 p-1 ml-1 rounded focus:outline-none focus-visible:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200"
              >
                <img
                  alt="profile"
                  src={currentUser.photoURL || "/images/profile.svg"}
                  className={`object-cover h-full w-full rounded-full ${
                    !currentUser.photoURL && "dark:invert"
                  }`}
                />
              </Link>
            )}

            {/* Theme switcher */}
            <ThemeSwitch />

            {/* Mobile navigation */}
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
