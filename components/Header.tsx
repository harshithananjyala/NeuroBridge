"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { UserCircle2 } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (token && userData) {
      setUser(JSON.parse(userData));
      setPoints(120);
    } else {
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setUser(null);
    router.push("/auth/login");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Companion", path: "/companion" },
    { name: "Planner", path: "/planner" },
    { name: "Mood", path: "/mood" },
    { name: "Neuro-Play", path: "/neuro-play" },
    { name: "Community", path: "/community" },
    { name: "Consult", path: "/consult" },
    { name: "Appointments", path: "/appointments" },
  ];

  if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-sky-50 via-white to-sky-50 border-b border-sky-100 shadow-sm backdrop-blur-md">
      <Link href="/" className="text-2xl font-semibold text-sky-900 tracking-tight">
        NeuroBridge
      </Link>

      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-xs font-medium transition ${
                pathname === item.path
                  ? "text-sky-800 underline underline-offset-4"
                  : "text-slate-600 hover:text-sky-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right text-xs text-slate-600">
              <p className="font-semibold text-sky-900">
                {user.name || user.email || "You"}
              </p>
              <p className="text-[10px] truncate max-w-[130px]">
                {user.university || ""}
              </p>
            </div>
            <div className="bg-sky-100 px-3 py-1 rounded-full text-sky-800 text-[11px] font-semibold shadow-inner">
              {points} pts
            </div>
            <UserCircle2 className="w-7 h-7 text-sky-800" />
            <button
              onClick={handleLogout}
              className="text-[11px] text-slate-600 hover:text-sky-800"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3 text-xs">
            <Link href="/auth/login" className="text-sky-800 font-medium hover:underline">
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-3 py-1 rounded-full bg-sky-700 text-white font-medium shadow-sm hover:bg-sky-800"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

