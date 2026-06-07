import { unstable_noStore as noStore } from "next/cache";
import { getSql } from "./db";

export type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export async function ensureArticlesTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      excerpt TEXT,
      content TEXT NOT NULL,
      published BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getPublishedArticles(): Promise<Article[]> {
  noStore();
  await ensureArticlesTable();
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM articles
    WHERE published = true
    ORDER BY created_at DESC
  `;
  return rows as Article[];
}

export async function getAllArticles(): Promise<Article[]> {
  await ensureArticlesTable();
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM articles
    ORDER BY created_at DESC
  `;
  return rows as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  noStore();
  await ensureArticlesTable();
  const sql = getSql();
  const rows = await sql`
    SELECT * FROM articles WHERE slug = ${slug} LIMIT 1
  `;
  return (rows[0] as Article) ?? null;
}

export async function getArticleById(id: number): Promise<Article | null> {
  await ensureArticlesTable();
  const sql = getSql();
  const rows = await sql`SELECT * FROM articles WHERE id = ${id} LIMIT 1`;
  return (rows[0] as Article) ?? null;
}

export async function createArticle(data: {
  title: string;
  excerpt?: string;
  content: string;
  published?: boolean;
}): Promise<Article> {
  await ensureArticlesTable();
  const sql = getSql();
  let slug = slugify(data.title);
  const existing = await sql`SELECT id FROM articles WHERE slug = ${slug}`;
  if (existing.length > 0) {
    slug = `${slug}-${Date.now()}`;
  }

  const rows = await sql`
    INSERT INTO articles (title, slug, excerpt, content, published)
    VALUES (
      ${data.title},
      ${slug},
      ${data.excerpt ?? null},
      ${data.content},
      ${data.published ?? false}
    )
    RETURNING *
  `;
  return rows[0] as Article;
}

export async function updateArticle(
  id: number,
  data: Partial<{ title: string; excerpt: string; content: string; published: boolean }>
): Promise<Article | null> {
  await ensureArticlesTable();
  const current = await getArticleById(id);
  if (!current) return null;

  const sql = getSql();
  const title = data.title ?? current.title;
  const excerpt = data.excerpt !== undefined ? data.excerpt : current.excerpt;
  const content = data.content ?? current.content;
  const published = data.published !== undefined ? data.published : current.published;

  let slug = current.slug;
  if (data.title && data.title !== current.title) {
    slug = slugify(data.title);
    const existing = await sql`SELECT id FROM articles WHERE slug = ${slug} AND id != ${id}`;
    if (existing.length > 0) slug = `${slug}-${id}`;
  }

  const rows = await sql`
    UPDATE articles
    SET title = ${title},
        slug = ${slug},
        excerpt = ${excerpt},
        content = ${content},
        published = ${published},
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return (rows[0] as Article) ?? null;
}

export async function deleteArticle(id: number): Promise<boolean> {
  await ensureArticlesTable();
  const sql = getSql();
  const rows = await sql`DELETE FROM articles WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
