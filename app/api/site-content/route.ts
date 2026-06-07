import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/site-content";
import type { SiteContent } from "@/lib/site-content-types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("[site-content GET]", error);
    return NextResponse.json({ error: "Impossible de charger le contenu" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SiteContent;
    await saveSiteContent(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[site-content PUT]", error);
    return NextResponse.json({ error: "Erreur lors de la sauvegarde" }, { status: 500 });
  }
}
