import { unstable_noStore as noStore } from "next/cache";
import type { DeepPartial, SiteContent } from "./site-content-types";
import { defaultSiteContent } from "./site-content-defaults";
import { getSql } from "./db";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeSiteContent(
  defaults: SiteContent,
  override: DeepPartial<SiteContent> | null | undefined
): SiteContent {
  if (!override) return structuredClone(defaults);

  const merge = (base: unknown, patch: unknown): unknown => {
    if (patch === undefined || patch === null) return base;
    if (Array.isArray(patch)) return structuredClone(patch);
    if (isObject(base) && isObject(patch)) {
      const result: Record<string, unknown> = { ...base };
      for (const key of Object.keys(patch)) {
        result[key] = merge(base[key], patch[key]);
      }
      return result;
    }
    return patch;
  };

  return merge(defaults, override) as SiteContent;
}

export async function ensureSiteContentTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      id INT PRIMARY KEY DEFAULT 1,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      CONSTRAINT single_row CHECK (id = 1)
    )
  `;
}

export async function getSiteContent(): Promise<SiteContent> {
  noStore();
  await ensureSiteContentTable();
  const sql = getSql();
  const rows = await sql`SELECT content FROM site_content WHERE id = 1 LIMIT 1`;
  if (!rows.length) return structuredClone(defaultSiteContent);
  return mergeSiteContent(defaultSiteContent, rows[0].content as DeepPartial<SiteContent>);
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await ensureSiteContentTable();
  const sql = getSql();
  await sql`
    INSERT INTO site_content (id, content, updated_at)
    VALUES (1, ${JSON.stringify(content)}::jsonb, NOW())
    ON CONFLICT (id) DO UPDATE SET
      content = EXCLUDED.content,
      updated_at = NOW()
  `;
}
