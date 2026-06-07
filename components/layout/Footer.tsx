import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { MapPin, Phone, Mail } from "lucide-react";
import type { SiteContent } from "@/lib/site-content-types";

export default function Footer({ content }: { content: SiteContent }) {
  const { global, navigation, contact } = content;
  const contactHref = "/contact";

  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 lg:px-8">
        <div>
          <Logo variant="light" />
          <p className="mt-4 font-serif text-lg text-cream">{global.siteName}</p>
          <p className="mt-2 text-sm text-cream/60">{global.footerDescription}</p>
        </div>

        <div>
          <h3 className="section-label mb-6">Navigation</h3>
          <ul className="space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm transition-colors hover:text-gold">
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
              <span>{contact.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                {contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-gold">
                    {phone}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="hover:text-gold">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/25">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-cream/50 lg:px-8">
          <p>
            © {new Date().getFullYear()} {global.footerCopyright}
          </p>
          <p className="mt-1">{global.barreauNote}</p>
        </div>
      </div>
    </footer>
  );
}
