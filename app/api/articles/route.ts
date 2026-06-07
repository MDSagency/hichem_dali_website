import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  createArticle,
  getAllArticles,
  getPublishedArticles,
} from "@/lib/articles";

const articleSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().min(10),
  published: z.boolean().optional(),
});

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get("admin") === "true";

    if (admin) {
      if (!isAdminAuthenticated()) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
      }
      const articles = await getAllArticles();
      return NextResponse.json(articles);
    }

    const articles = await getPublishedArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error("[articles GET]", error);
    return NextResponse.json(
      { error: "Impossible de charger les articles. Vérifiez DATABASE_URL." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = articleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const article = await createArticle(parsed.data);
    revalidatePath("/articles");
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("[articles POST]", error);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
