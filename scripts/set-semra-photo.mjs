import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";

const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const dbUrl = env.match(/^DATABASE_URL=(.+)$/m)?.[1]?.trim();
if (!dbUrl) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

const sql = neon(dbUrl);
const rows = await sql`SELECT content FROM site_content WHERE id = 1 LIMIT 1`;
if (!rows.length) {
  console.log("No site_content row — defaults apply, nothing to update.");
  process.exit(0);
}

const content = rows[0].content;
const members = content.equipe?.members;
if (!Array.isArray(members)) {
  console.log("No equipe.members override in DB — defaults apply, nothing to update.");
  process.exit(0);
}

const semra = members.find((m) => m.name?.includes("Semra"));
if (!semra) {
  console.log("Semra not found in DB members.");
  process.exit(0);
}
semra.photo = "/images/semra.webp";
semra.photoAlt = "Portrait de Maître Semra Yasmine Lina";

await sql`
  UPDATE site_content
  SET content = ${JSON.stringify(content)}::jsonb, updated_at = NOW()
  WHERE id = 1
`;
console.log("Semra photo set in DB.");
