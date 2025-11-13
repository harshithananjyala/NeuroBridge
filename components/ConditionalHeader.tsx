"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function ConditionalHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideHeader =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}
