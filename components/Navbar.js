"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useApp();

  const linkClass = (active) =>
    `rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active ? "bg-accent/10 text-accent" : "text-muted hover:text-white"
    }`;

  return (
    <header className="border-b border-line">
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-5 py-4 sm:px-8">
        {/* logo */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="FitLog logo" className="h-7 w-7" />
          <span className="font-display text-xl font-semibold uppercase tracking-wide">
            FitLog
          </span>
        </Link>

        {/* links */}
        <nav className="order-3 flex w-full justify-center gap-2 sm:absolute sm:left-1/2 sm:order-none sm:w-auto sm:-translate-x-1/2">
          <Link href="/" className={linkClass(pathname === "/")}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass(pathname === "/my-plan")}>
            My Plan
          </Link>
        </nav>

        {/* badges */}
        <Link href="/my-plan" className="flex items-center gap-5 text-sm">
          <span className="flex items-center gap-2">
            Plan
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-black">
              {plan.length}
            </span>
          </span>
          <span className="flex items-center gap-2 text-muted">
            Saved
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-line px-1.5 text-xs font-semibold text-white">
              {saved.length}
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}
