import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";

const envPath = new URL("../.env.local", import.meta.url);
const env = readFileSync(envPath, "utf8");
const dbUrl = env.match(/^DATABASE_URL=(.+)$/m)?.[1]?.trim();
if (!dbUrl) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

const semra = {
  name: "Maître Semra Yasmine Lina",
  role: "Avocate collaboratrice",
  title: "Avocate à la Cour",
  bio: "Avocate au Barreau de Annaba, elle intervient en droit de la famille, du foncier, des affaires, pénal et administratif. À l'écoute et rigoureuse dans l'analyse de chaque dossier, elle défend vos intérêts avec confidentialité, diligence et déontologie.",
  specialties: [
    "Droit de la famille",
    "Droit foncier",
    "Droit des affaires",
    "Droit pénal",
    "Droit administratif",
  ],
};

const sql = neon(dbUrl);
const rows = await sql`SELECT content FROM site_content WHERE id = 1 LIMIT 1`;

if (!rows.length) {
  console.log("No site_content row found — defaults will apply on next load.");
  process.exit(0);
}

const content = rows[0].content;
const members = (content.equipe?.members ?? []).filter(
  (m) => !m.name.includes("[Nom")
);
const placeholderIndex = members.findIndex((m) => m.name.includes("Semra"));
const hasSemra = members.some((m) => m.name.includes("Semra Yasmine Lina"));
const updatedMembers = hasSemra
  ? members
  : placeholderIndex >= 0
    ? members.map((m, i) => (i === placeholderIndex ? semra : m))
    : [...members, semra];

content.equipe = { ...content.equipe, members: updatedMembers };

await sql`
  UPDATE site_content
  SET content = ${JSON.stringify(content)}::jsonb, updated_at = NOW()
  WHERE id = 1
`;

console.log(`Équipe mise à jour (${updatedMembers.length} membres).`);
