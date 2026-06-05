import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { navItems, contactHref } from "@/lib/navigation";
import { contactInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" className="inline-block">
            <span className="font-serif text-2xl font-semibold tracking-widest text-cream">
              DALI
            </span>
            <span className="mt-1 block h-px w-16 bg-gold" />
          </Link>
          <p className="mt-4 font-serif text-lg text-cream">Cabinet Maître DALI Hichem</p>
          <p className="mt-2 text-sm text-cream/60">
            Avocat à la Cour Suprême &amp; au Conseil d&apos;État — Annaba, Algérie
          </p>
        </div>

        <div>
          <h3 className="section-label mb-6">Navigation</h3>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={contactHref} className="text-sm transition-colors hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="section-label mb-6">Coordonnées</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{contactInfo.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                {contactInfo.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-gold">
                    {phone}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-gold">
                {contactInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/25">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-cream/50 lg:px-8">
          <p>© {new Date().getFullYear()} Cabinet Maître DALI Hichem. Tous droits réservés.</p>
          <p className="mt-1">Annaba, Algérie — Barreau de Annaba depuis 1999</p>
        </div>
      </div>
    </footer>
  );
}
