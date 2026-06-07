import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/auth";
import { deleteArticle, getArticleById, updateArticle } from "@/lib/articles";

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10).optional(),
  published: z.boolean().optional(),
});

type RouteContext = { params: { id: string } };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const article = await getArticleById(Number(params.id));
    if (!article) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    if (!article.published && !isAdminAuthenticated()) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("[article GET]", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const article = await updateArticle(Number(params.id), parsed.data);
    if (!article) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("[article PUT]", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const deleted = await deleteArticle(Number(params.id));
    if (!deleted) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[article DELETE]", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
