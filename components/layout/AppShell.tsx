"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { SiteContent } from "@/lib/site-content-types";

export default function AppShell({
  children,
  content,
}: {
  children: React.ReactNode;
  content: SiteContent;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer content={content} />
    </>
  );
}
