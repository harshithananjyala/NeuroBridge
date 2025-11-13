"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/companion", label: "Companion" },
  { href: "/planner", label: "Planner" },
  { href: "/mood", label: "Mood" },
  { href: "/neuro-play", label: "Neuro-Play" },
  { href: "/community", label: "Community" },
  { href: "/consult", label: "Consult" }
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <Link href="/" className="font-semibold text-lg">
            NeuroBridge
          </Link>
        </div>
        <div className="flex-1 flex items-center gap-3 justify-center text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-full transition ${
                pathname === l.href
                  ? "bg-pink-500 text-slate-950"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs">
          {session?.user ? (
            <>
              <span className="text-slate-300 max-w-[100px] truncate">
                hi, {session.user.name || session.user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-3 py-1 rounded-full bg-pink-500 text-slate-950"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
