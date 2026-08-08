"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { setSignin, setSignOut } from "@/store/slices/authSlice";
import { CommonButton } from "@/Attribute";
import { setToast } from "@/utils";

export default function Header() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleMockLogin = () => {
    dispatch(
      setSignin({
        token: "mock-jwt-token-12345",
        user: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          avatarUrl: "",
        },
      })
    );
    setToast({ message: "Welcome back, John Doe!", type: "success" });
  };

  const handleLogout = () => {
    dispatch(setSignOut());
    setToast({ message: "Logged out successfully.", type: "info" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-black/80 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 select-none">
          <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center font-bold text-white dark:text-black">
            N
          </div>
          <span className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
            NextQuickStart
          </span>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Features
          </a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Architecture
          </a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Docs
          </a>
        </nav>

        {/* Auth details */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end text-xs sm:text-sm">
                <span className="font-semibold text-zinc-900 dark:text-zinc-50 leading-none">
                  {user.name}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400 leading-none mt-1">
                  {user.email}
                </span>
              </div>
              <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-750 select-none">
                {user.name[0]}
              </div>
              <CommonButton variant="outline" size="sm" onClick={handleLogout}>
                Sign Out
              </CommonButton>
            </div>
          ) : (
            <CommonButton size="sm" onClick={handleMockLogin}>
              Mock Sign In
            </CommonButton>
          )}
        </div>
      </div>
    </header>
  );
}