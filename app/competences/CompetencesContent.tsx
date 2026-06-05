"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { competences } from "@/lib/data";

export default function CompetencesContent() {
  return (
    <PageTransition>
      <PageHero
        label="03 / COMPÉTENCES"
        title="Compétences & Domaines d'Intervention"
        subtitle="Expertise appliquée et approche juridique sur mesure"
        image="/images/boona-3.jpg"
        imageAlt="Architecture de Annaba"
      />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center text-stone">
          <p>
            Nous mettons à votre service notre expertise appliquée et notre approche juridique.
          </p>
          <p>
            Nous mettons à la disposition des entreprises et des particuliers, outre la compétence
            et l&apos;efficacité d&apos;un cabinet généraliste, celle d&apos;avocat spécialisé.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="bg-parchment px-6 py-20 lg:px-8">
        <motion.div
          className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {competences.map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden bg-cream p-8 transition-colors hover:bg-gold"
            >
              <span className="roman-numeral-bg -right-2 -top-4 group-hover:text-cream/10">
                {item.roman}
              </span>
              <item.icon
                size={28}
                className="relative text-gold group-hover:text-charcoal"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="relative mt-4 font-sans text-sm font-medium uppercase tracking-widest group-hover:text-charcoal">
                {item.title}
              </h3>
              <p className="relative mt-3 text-sm text-stone group-hover:text-charcoal/80">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </SectionReveal>
    </PageTransition>
  );
}
