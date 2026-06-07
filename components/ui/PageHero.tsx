import Image from "next/image";
import Divider from "./Divider";

type PageHeroProps = {
  label: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
};

export default function PageHero({
  label,
  title,
  subtitle,
  image,
  imageAlt = "",
  fullHeight = false,
  children,
}: PageHeroProps) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden bg-charcoal text-cream ${
        fullHeight ? "min-h-screen" : "min-h-[60vh]"
      }`}
    >
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover sepia-photo opacity-50"
            priority={!fullHeight}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/45 via-charcoal/35 to-charcoal/55" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="hero-label mb-6 mt-10 text-gold md:mt-14">{label}</p>
        <h1 className="hero-title text-cream">{title}</h1>
        {subtitle && (
          <p className="hero-subtitle mt-6 text-cream/85">{subtitle}</p>
        )}
        <Divider className="mt-8" />
        {children}
      </div>
    </section>
  );
}
