"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

export default function SiteHeader() {
  const pathname = usePathname();
  return pathname === "/Browse-Listings" ? null : <Header />;
}
