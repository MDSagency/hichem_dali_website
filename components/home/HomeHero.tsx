"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Divider from "@/components/ui/Divider";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export default function HomeHero() {
  const { home } = useSiteContent();
  const { carousel, hero } = home;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!carousel.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carousel.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [carousel.length]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {carousel.length > 0 && (
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={carousel[index].src}
              alt={carousel[index].alt}
              fill
              className="object-cover sepia-photo"
              priority={index === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/50" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center text-cream">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="hero-label mb-6 mt-10 text-charcoal md:mt-14"
        >
          {hero.label}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="hero-title text-cream"
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="hero-subtitle mt-6 text-cream/90"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <Divider className="mt-8" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="hero-body mt-8 text-cream/80"
        >
          {hero.inscription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/presentation" className="btn-primary">
            {hero.btnPrimary}
          </Link>
          <Link href="/contact" className="btn-outline-light">
            {hero.btnSecondary}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
