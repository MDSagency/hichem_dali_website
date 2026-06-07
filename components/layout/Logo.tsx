"use client";

import Link from "next/link";
import { Scale } from "lucide-react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export default function Logo({ variant = "light", className = "" }: LogoProps) {
  const { global } = useSiteContent();
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`Accueil — ${global.siteName}`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center border ${
          isLight ? "border-gold/50 bg-charcoal" : "border-gold/40 bg-parchment"
        }`}
      >
        <Scale size={22} className="text-gold" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div>
        <span
          className={`block font-serif text-lg font-semibold tracking-widest ${
            isLight ? "text-cream" : "text-charcoal"
          }`}
        >
          {global.logoLine1}
        </span>
        <span
          className={`mt-1 block font-accent text-[9px] leading-tight tracking-[0.15em] ${
            isLight ? "text-cream/70" : "text-stone"
          }`}
        >
          {global.logoLine2}
        </span>
        <span
          className={`block font-accent text-[8px] tracking-[0.12em] ${
            isLight ? "text-cream/50" : "text-stone/80"
          }`}
        >
          {global.logoLine3}
        </span>
      </div>
    </Link>
  );
}
