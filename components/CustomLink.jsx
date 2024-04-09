"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomLink({ href, children, className }) {
  const pathName = usePathname();

  const active = pathName === href;

  return (
    <Link
      className={`${className} ${active ? "border-s-2 border-[#36b49f]" : ""}`}
      href={href}
    >
      {children}
    </Link>
  );
}
