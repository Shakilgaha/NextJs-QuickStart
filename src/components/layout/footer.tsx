"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black py-8 transition-colors mt-auto">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-550 dark:text-zinc-450">
        <div>
          &copy; {new Date().getFullYear()} NextQuickStart. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}