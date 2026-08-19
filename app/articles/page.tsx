import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import PageHero from "@/components/ui/PageHero";
import SectionReveal from "@/components/ui/SectionReveal";
import { getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
};

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  let articles: Awaited<ReturnType<typeof getPublishedArticles>> = [];
  let dbError = false;

  try {
    articles = await getPublishedArticles();
  } catch {
    dbError = true;
  }

  return (
    <PageTransition>
      <PageHero
        label="ARTICLES"
        title="Articles & Actualités"
        subtitle="Analyses juridiques et publications du cabinet"
        image="/images/boona-2.jpg"
        imageAlt="Publications juridiques"
      />

      <SectionReveal className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <figure className="corner-brackets relative mb-16">
            <div className="relative aspect-[3/2] w-full overflow-hidden border border-gold/25 sm:aspect-[21/9]">
              <Image
                src="/images/6.jpeg"
                alt="Lampe de bibliothèque éclairant des ouvrages juridiques reliés"
                fill
                className="object-cover sepia-photo"
                priority
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </figure>

          {dbError ? (
            <p className="text-center text-stone">
              Les articles ne sont pas disponibles pour le moment. La base de données n&apos;est
              pas encore configurée.
            </p>
          ) : articles.length === 0 ? (
            <p className="text-center text-stone">
              Aucun article publié pour le moment. Revenez prochainement.
            </p>
          ) : (
            <div className="space-y-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="corner-brackets border border-gold/25 bg-parchment p-8 transition-shadow hover:shadow-md"
                >
                  <time
                    dateTime={article.created_at}
                    className="section-label text-xs"
                  >
                    {new Date(article.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <h2 className="mt-3 font-serif text-2xl font-medium md:text-3xl">
                    <Link href={`/articles/${article.slug}`} className="hover:text-gold">
                      {article.title}
                    </Link>
                  </h2>
                  {article.excerpt && (
                    <p className="mt-4 text-stone">{article.excerpt}</p>
                  )}
                  <Link
                    href={`/articles/${article.slug}`}
                    className="mt-6 inline-flex text-sm font-medium text-gold hover:text-gold-light"
                  >
                    Lire la suite →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
