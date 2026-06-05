import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import { contactInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHero
        label="07 / CONTACT"
        title="Contact"
        subtitle="Prenez rendez-vous avec le cabinet"
        image="/images/boona-2.jpg"
        imageAlt="Cabinet à Annaba"
      />

      <div className="grid lg:grid-cols-5">
        <section className="bg-cream px-6 py-16 lg:col-span-3 lg:px-12 lg:py-20">
          <h2 className="font-serif text-3xl font-medium">Envoyer un message</h2>
          <p className="mt-4 text-stone">
            Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </section>

        <section className="bg-charcoal px-6 py-16 text-cream lg:col-span-2 lg:px-10 lg:py-20">
          <h2 className="font-serif text-3xl font-medium">Coordonnées</h2>

          <ul className="mt-10 space-y-8">
            <li className="flex gap-4">
              <MapPin size={22} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="section-label mb-1">Adresse</p>
                <p className="text-cream/80">{contactInfo.address}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone size={22} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="section-label mb-1">Téléphone</p>
                <div className="flex flex-col gap-1">
                  {contactInfo.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-cream/80 transition-colors hover:text-gold"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </li>
            <li className="flex gap-4">
              <Mail size={22} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="section-label mb-1">E-mail</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-cream/80 transition-colors hover:text-gold"
                >
                  {contactInfo.email}
                </a>
              </div>
            </li>
          </ul>

          <div className="mt-12 aspect-video w-full overflow-hidden border border-gold/25">
            <iframe
              title="Localisation du cabinet — Annaba"
              src="https://maps.google.com/maps?q=Cours+de+la+Révolution+Annaba+Algérie&output=embed"
              className="h-full w-full border-0 grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
