import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageTransition from "@/components/layout/PageTransition";
import SectionReveal from "@/components/ui/SectionReveal";
import { getArticleBySlug } from "@/lib/articles";

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const article = await getArticleBySlug(params.slug);
    if (!article || !article.published) return { title: "Article" };
    return {
      title: article.title,
      description: article.excerpt ?? undefined,
    };
  } catch {
    return { title: "Article" };
  }
}

export const dynamic = "force-dynamic";

export default async function ArticleDetailPage({ params }: PageProps) {
  let article;
  try {
    article = await getArticleBySlug(params.slug);
  } catch {
    notFound();
  }

  if (!article || !article.published) notFound();

  return (
    <PageTransition>
      <SectionReveal className="bg-charcoal px-6 py-28 text-cream lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">
            {new Date(article.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">{article.title}</h1>
          <div className="mx-auto mt-6 h-px w-[60px] bg-gold" />
        </div>
      </SectionReveal>

      <SectionReveal className="bg-cream px-6 py-16 lg:px-8">
        <article className="prose prose-lg mx-auto max-w-3xl">
          {article.excerpt && (
            <p className="font-serif text-xl italic text-stone">{article.excerpt}</p>
          )}
          <div className="mt-8 whitespace-pre-wrap text-stone leading-relaxed">
            {article.content}
          </div>
        </article>
        <div className="mx-auto mt-12 max-w-3xl">
          <Link href="/articles" className="btn-outline">
            ← Retour aux articles
          </Link>
        </div>
      </SectionReveal>
    </PageTransition>
  );
}
