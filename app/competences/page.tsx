import type { Metadata } from "next";
import CompetencesContent from "./CompetencesContent";

export const metadata: Metadata = {
  title: "Compétences",
};

export default function CompetencesPage() {
  return <CompetencesContent />;
}
