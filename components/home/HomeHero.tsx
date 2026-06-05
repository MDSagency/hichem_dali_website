"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Divider from "@/components/ui/Divider";
import { heroCarouselImages } from "@/lib/data";

export default function HomeHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroCarouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroCarouselImages[index].src}
            alt={heroCarouselImages[index].alt}
            fill
            className="object-cover sepia-photo"
            priority={index === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/90" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center text-cream">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="section-label mb-6"
        >
          CABINET D&apos;AVOCAT — ANNABA, ALGÉRIE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-serif text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl"
        >
          Maître DALI Hichem
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-6 font-sans text-lg font-light md:text-xl"
        >
          Avocat à la Cour Suprême &amp; au Conseil d&apos;État
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
          className="mt-8 text-cream/80"
        >
          Inscrit au Barreau de Annaba depuis le 28 juin 1999
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/presentation" className="btn-primary">
            Découvrir le Cabinet
          </Link>
          <Link href="/contact" className="btn-outline-light">
            Nous Contacter
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
