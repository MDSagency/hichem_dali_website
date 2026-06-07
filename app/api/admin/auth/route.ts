import { NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  createAdminSessionValue,
  isAdminAuthenticated,
} from "@/lib/auth";

const loginSchema = z.object({
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Mot de passe requis" }, { status: 400 });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json({ error: "Admin non configuré" }, { status: 500 });
    }

    if (parsed.data.password !== adminPassword) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    const sessionValue = createAdminSessionValue();
    if (!sessionValue) {
      return NextResponse.json({ error: "Erreur de session" }, { status: 500 });
    }

    cookies().set(ADMIN_COOKIE, sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  cookies().delete(ADMIN_COOKIE);
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ authenticated: isAdminAuthenticated() });
}
