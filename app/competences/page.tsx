import type { Metadata } from "next";
import CompetencesContent from "./CompetencesContent";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = { title: "Compétences" };
export const dynamic = "force-dynamic";

export default async function CompetencesPage() {
  const { competences } = await getSiteContent();
  return <CompetencesContent data={competences} />;
}
