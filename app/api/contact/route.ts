import { NextResponse } from "next/server";
import { createContactSchema } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/email";
import { getSiteContent } from "@/lib/site-content";

export async function POST(request: Request) {
  try {
    const content = await getSiteContent();
    const body = await request.json();
    const parsed = createContactSchema(content.contact.subjectOptions).safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await sendContactEmail(parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact]", error);

    const message =
      error instanceof Error && error.message === "Configuration e-mail manquante"
        ? "Le service e-mail n'est pas configuré."
        : "Impossible d'envoyer le message pour le moment.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
