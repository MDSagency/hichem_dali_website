"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const contactHref = "/contact";

export default function Header() {
  const { navigation } = useSiteContent();
  const navItems = navigation;
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const headerSolid = scrolled || !isHome || menuOpen;

  const mobileMenu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {menuOpen && (
          <div
            className="fixed inset-0 z-[60] bg-charcoal lg:hidden"
            style={{ top: "72px" }}
          >
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-full flex-col items-center justify-center gap-8 overflow-y-auto px-6 py-10"
              aria-label="Navigation mobile"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="font-serif text-2xl text-cream transition-colors hover:text-gold"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navItems.length * 0.05 }}
              >
                <Link href={contactHref} className="btn-outline-light" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </motion.div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] border-b border-gold/25 bg-charcoal transition-all duration-500 ${
          menuOpen ? "" : "backdrop-blur-md"
        } ${
          headerSolid
            ? "lg:bg-charcoal/95"
            : "lg:border-transparent lg:bg-transparent lg:backdrop-blur-none"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Logo variant="light" />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-sans text-xs font-medium uppercase tracking-[0.08em] transition-colors hover:text-gold ${
                  pathname === item.href ? "text-gold" : "text-cream/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href={contactHref} className="btn-outline px-6 py-2 text-xs">
              Contact
            </Link>
          </nav>

          <button
            type="button"
            className="relative z-[71] text-cream lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
