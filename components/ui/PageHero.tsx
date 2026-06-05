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
            className="object-cover sepia-photo opacity-30"
            priority={!fullHeight}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="section-label mb-6">{label}</p>
        <h1 className="font-serif text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 font-sans text-lg font-light tracking-wide text-cream/80 md:text-xl">
            {subtitle}
          </p>
        )}
        <Divider className="mt-8" />
        {children}
      </div>
    </section>
  );
}
