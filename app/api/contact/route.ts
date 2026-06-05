import { NextResponse } from "next/server";
import { contactInfo } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const mailtoBody = encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\n${message}`
    );
    const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
      `[Site Web] ${subject} — ${name}`
    )}&body=${mailtoBody}`;

    return NextResponse.json({ success: true, mailto: mailtoLink });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
