"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/site-content-types";
import type { Article } from "@/lib/articles";
import { defaultSiteContent } from "@/lib/site-content-defaults";
import { iconOptions } from "@/lib/icons";
import { Field, SectionCard, StringListEditor, HeroEditor } from "@/components/admin/AdminFields";

const TABS = [
  { id: "general", label: "Général" },
  { id: "home", label: "Accueil" },
  { id: "contact", label: "Contact" },
  { id: "presentation", label: "Présentation" },
  { id: "objectifs", label: "Objectifs" },
  { id: "competences", label: "Compétences" },
  { id: "entreprise", label: "Entreprise" },
  { id: "honoraires", label: "Honoraires" },
  { id: "equipe", label: "Équipe" },
  { id: "liens", label: "Liens" },
  { id: "articles", label: "Articles" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type ArticleForm = {
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
};

const emptyArticle: ArticleForm = { title: "", excerpt: "", content: "", published: false };

export default function AdminDashboardClient() {
  const [tab, setTab] = useState<TabId>("general");
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleForm, setArticleForm] = useState<ArticleForm>(emptyArticle);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);

  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/site-content");
      if (res.ok) setContent(await res.json());
    } finally {
      setLoading(false);
    }
  };

  const loadArticles = async () => {
    const res = await fetch("/api/articles?admin=true");
    if (res.ok) setArticles(await res.json());
  };

  useEffect(() => {
    loadContent();
    loadArticles();
  }, []);

  const saveContent = async () => {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/site-content", {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (res.ok) {
      setMessage(
        "Contenu enregistré avec succès. Actualisez les pages publiques (Ctrl+F5) pour voir les changements."
      );
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(data.error ?? `Erreur lors de la sauvegarde (${res.status}).`);
    }
  };

  const saveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingArticleId ? `/api/articles/${editingArticleId}` : "/api/articles";
    const method = editingArticleId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(articleForm),
    });
    if (res.ok) {
      setArticleForm(emptyArticle);
      setEditingArticleId(null);
      loadArticles();
      setMessage("Article enregistré.");
    }
  };

  const deleteArticle = async (id: number) => {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    loadArticles();
  };

  return (
    <>
      <div className="border-b border-gold/25 bg-parchment px-4 py-3 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <h2 className="font-serif text-lg">Tableau de bord</h2>
          <button
            type="button"
            onClick={saveContent}
            disabled={saving || tab === "articles"}
            className="btn-primary px-4 py-2 text-xs disabled:opacity-50"
          >
            <span className="flex items-center gap-1">
              <Save size={14} aria-hidden="true" />
              {saving ? "Enregistrement…" : "Enregistrer les modifications"}
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:px-8">
        <nav className="flex shrink-0 flex-wrap gap-1 lg:w-52 lg:flex-col">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3 py-2 text-left text-sm transition-colors ${
                tab === t.id
                  ? "bg-charcoal text-cream"
                  : "bg-parchment text-charcoal hover:bg-gold/20"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <main className="min-w-0 flex-1">
          {message && (
            <p className="mb-4 border border-gold/25 bg-parchment px-4 py-2 text-sm">{message}</p>
          )}
          {loading ? (
            <Loader2 className="animate-spin text-gold" size={28} />
          ) : tab === "general" ? (
            <div className="space-y-4">
              <SectionCard title="Identité du cabinet">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Nom du site" value={content.global.siteName} onChange={(v) => setContent({ ...content, global: { ...content.global, siteName: v } })} />
                  <Field label="Logo — Ligne 1" value={content.global.logoLine1} onChange={(v) => setContent({ ...content, global: { ...content.global, logoLine1: v } })} />
                  <Field label="Logo — Cours Suprême" value={content.global.logoLine2} onChange={(v) => setContent({ ...content, global: { ...content.global, logoLine2: v } })} />
                  <Field label="Logo — Sous-titre" value={content.global.logoLine3} onChange={(v) => setContent({ ...content, global: { ...content.global, logoLine3: v } })} />
                  <Field label="Description footer" value={content.global.footerDescription} onChange={(v) => setContent({ ...content, global: { ...content.global, footerDescription: v } })} multiline />
                  <Field label="Copyright" value={content.global.footerCopyright} onChange={(v) => setContent({ ...content, global: { ...content.global, footerCopyright: v } })} />
                  <Field label="Note barreau" value={content.global.barreauNote} onChange={(v) => setContent({ ...content, global: { ...content.global, barreauNote: v } })} />
                </div>
              </SectionCard>
              <SectionCard title="SEO">
                <div className="space-y-3">
                  <Field label="Titre SEO" value={content.global.seoTitle} onChange={(v) => setContent({ ...content, global: { ...content.global, seoTitle: v } })} />
                  <Field label="Description SEO" value={content.global.seoDescription} onChange={(v) => setContent({ ...content, global: { ...content.global, seoDescription: v } })} multiline rows={3} />
                  <StringListEditor label="Mots-clés" items={content.global.seoKeywords} onChange={(v) => setContent({ ...content, global: { ...content.global, seoKeywords: v } })} />
                </div>
              </SectionCard>
            </div>
          ) : tab === "home" ? (
            <div className="space-y-4">
              <SectionCard title="Hero accueil">
                <div className="grid gap-3 sm:grid-cols-2">
                  {Object.entries(content.home.hero).map(([key, val]) => (
                    <Field key={key} label={key} value={val} onChange={(v) => setContent({ ...content, home: { ...content.home, hero: { ...content.home.hero, [key]: v } } })} />
                  ))}
                </div>
              </SectionCard>
              <SectionCard title="Section domaines">
                <Field label="Étiquette" value={content.home.domainsSection.label} onChange={(v) => setContent({ ...content, home: { ...content.home, domainsSection: { ...content.home.domainsSection, label: v } } })} />
                <Field label="Titre" value={content.home.domainsSection.title} onChange={(v) => setContent({ ...content, home: { ...content.home, domainsSection: { ...content.home.domainsSection, title: v } } })} />
                {content.home.domainsSection.items.map((item, i) => (
                  <div key={i} className="mt-3 border-t border-gold/20 pt-3">
                    <Field label="Titre" value={item.title} onChange={(v) => { const items = [...content.home.domainsSection.items]; items[i] = { ...items[i], title: v }; setContent({ ...content, home: { ...content.home, domainsSection: { ...content.home.domainsSection, items } } }); }} />
                    <Field label="Description" value={item.description} onChange={(v) => { const items = [...content.home.domainsSection.items]; items[i] = { ...items[i], description: v }; setContent({ ...content, home: { ...content.home, domainsSection: { ...content.home.domainsSection, items } } }); }} multiline />
                  </div>
                ))}
              </SectionCard>
              <SectionCard title="Section expertise & CTA">
                <Field label="Titre expertise" value={content.home.expertiseSection.title} onChange={(v) => setContent({ ...content, home: { ...content.home, expertiseSection: { ...content.home.expertiseSection, title: v } } })} />
                <Field label="Titre CTA" value={content.home.ctaSection.title} onChange={(v) => setContent({ ...content, home: { ...content.home, ctaSection: { ...content.home.ctaSection, title: v } } })} />
                <Field label="Description CTA" value={content.home.ctaSection.description} onChange={(v) => setContent({ ...content, home: { ...content.home, ctaSection: { ...content.home.ctaSection, description: v } } })} multiline />
              </SectionCard>
            </div>
          ) : tab === "contact" ? (
            <SectionCard title="Contact">
              <div className="space-y-3">
                <Field label="Adresse" value={content.contact.address} onChange={(v) => setContent({ ...content, contact: { ...content.contact, address: v } })} multiline />
                <StringListEditor label="Téléphones" items={content.contact.phones} onChange={(v) => setContent({ ...content, contact: { ...content.contact, phones: v } })} />
                <Field label="E-mail" value={content.contact.email} onChange={(v) => setContent({ ...content, contact: { ...content.contact, email: v } })} />
                <Field label="Requête carte Google" value={content.contact.mapQuery} onChange={(v) => setContent({ ...content, contact: { ...content.contact, mapQuery: v } })} />
                <StringListEditor label="Sujets du formulaire" items={content.contact.subjectOptions} onChange={(v) => setContent({ ...content, contact: { ...content.contact, subjectOptions: v } })} />
                <Field label="Titre formulaire" value={content.contact.formTitle} onChange={(v) => setContent({ ...content, contact: { ...content.contact, formTitle: v } })} />
                <Field label="Description formulaire" value={content.contact.formDescription} onChange={(v) => setContent({ ...content, contact: { ...content.contact, formDescription: v } })} multiline />
              </div>
            </SectionCard>
          ) : tab === "presentation" ? (
            <div className="space-y-4">
              <SectionCard title="Hero"><HeroEditor hero={content.presentation.hero} onChange={(h) => setContent({ ...content, presentation: { ...content.presentation, hero: h } })} /></SectionCard>
              <SectionCard title="Contenu">
                <StringListEditor label="Paragraphes colonne gauche" items={content.presentation.paragraphsLeft} onChange={(v) => setContent({ ...content, presentation: { ...content.presentation, paragraphsLeft: v } })} />
                <StringListEditor label="Paragraphes colonne droite" items={content.presentation.paragraphsRight} onChange={(v) => setContent({ ...content, presentation: { ...content.presentation, paragraphsRight: v } })} />
                <Field label="Citation" value={content.presentation.quote} onChange={(v) => setContent({ ...content, presentation: { ...content.presentation, quote: v } })} multiline />
                <Field label="Années d'expérience" value={content.presentation.experienceYears} onChange={(v) => setContent({ ...content, presentation: { ...content.presentation, experienceYears: v } })} />
                <StringListEditor label="Domaines" items={content.presentation.domains} onChange={(v) => setContent({ ...content, presentation: { ...content.presentation, domains: v } })} />
              </SectionCard>
            </div>
          ) : tab === "objectifs" ? (
            <div className="space-y-4">
              <SectionCard title="Hero"><HeroEditor hero={content.objectifs.hero} onChange={(h) => setContent({ ...content, objectifs: { ...content.objectifs, hero: h } })} /></SectionCard>
              <SectionCard title="Contenu">
                <StringListEditor label="Paragraphes" items={content.objectifs.paragraphs} onChange={(v) => setContent({ ...content, objectifs: { ...content.objectifs, paragraphs: v } })} />
                <Field label="Citation" value={content.objectifs.quote} onChange={(v) => setContent({ ...content, objectifs: { ...content.objectifs, quote: v } })} />
                {content.objectifs.values.map((v, i) => (
                  <div key={i} className="border-t border-gold/20 pt-3">
                    <Field label={`Valeur ${i + 1} — titre`} value={v.title} onChange={(val) => { const values = [...content.objectifs.values]; values[i] = { ...values[i], title: val }; setContent({ ...content, objectifs: { ...content.objectifs, values } }); }} />
                    <Field label="Description" value={v.description} onChange={(val) => { const values = [...content.objectifs.values]; values[i] = { ...values[i], description: val }; setContent({ ...content, objectifs: { ...content.objectifs, values } }); }} multiline />
                  </div>
                ))}
                {content.objectifs.missions.map((m, i) => (
                  <div key={i} className="border-t border-gold/20 pt-3">
                    <Field label={`Mission ${i + 1}`} value={m.title} onChange={(val) => { const missions = [...content.objectifs.missions]; missions[i] = { ...missions[i], title: val }; setContent({ ...content, objectifs: { ...content.objectifs, missions } }); }} />
                    <Field label="Description" value={m.description} onChange={(val) => { const missions = [...content.objectifs.missions]; missions[i] = { ...missions[i], description: val }; setContent({ ...content, objectifs: { ...content.objectifs, missions } }); }} multiline />
                  </div>
                ))}
              </SectionCard>
            </div>
          ) : tab === "competences" ? (
            <div className="space-y-4">
              <SectionCard title="Hero"><HeroEditor hero={content.competences.hero} onChange={(h) => setContent({ ...content, competences: { ...content.competences, hero: h } })} /></SectionCard>
              <SectionCard title="Domaines">
                <StringListEditor label="Introduction" items={content.competences.intro} onChange={(v) => setContent({ ...content, competences: { ...content.competences, intro: v } })} />
                {content.competences.items.map((item, i) => (
                  <div key={i} className="mt-3 border-t border-gold/20 pt-3">
                    <Field label="Titre" value={item.title} onChange={(v) => { const items = [...content.competences.items]; items[i] = { ...items[i], title: v }; setContent({ ...content, competences: { ...content.competences, items } }); }} />
                    <Field label="Description" value={item.description} onChange={(v) => { const items = [...content.competences.items]; items[i] = { ...items[i], description: v }; setContent({ ...content, competences: { ...content.competences, items } }); }} multiline />
                    <label className="section-label mt-2 block text-xs">Icône</label>
                    <select value={item.icon} onChange={(e) => { const items = [...content.competences.items]; items[i] = { ...items[i], icon: e.target.value }; setContent({ ...content, competences: { ...content.competences, items } }); }} className="w-full border border-gold/25 bg-cream px-3 py-2 text-sm">
                      {iconOptions.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </div>
                ))}
                <button type="button" onClick={() => setContent({ ...content, competences: { ...content.competences, items: [...content.competences.items, { roman: "XII", icon: "Scale", title: "Nouveau domaine", description: "" }] } })} className="mt-2 text-xs text-gold">+ Ajouter une compétence</button>
              </SectionCard>
            </div>
          ) : tab === "entreprise" ? (
            <div className="space-y-4">
              <SectionCard title="Hero"><HeroEditor hero={content.entreprise.hero} onChange={(h) => setContent({ ...content, entreprise: { ...content.entreprise, hero: h } })} /></SectionCard>
              <SectionCard title="Contenu">
                <StringListEditor label="Paragraphes" items={content.entreprise.paragraphs} onChange={(v) => setContent({ ...content, entreprise: { ...content.entreprise, paragraphs: v } })} />
                {content.entreprise.pillars.map((p, i) => (
                  <div key={i} className="border-t border-gold/20 pt-3">
                    <Field label={`Pilier ${i + 1}`} value={p.title} onChange={(v) => { const pillars = [...content.entreprise.pillars]; pillars[i] = { ...pillars[i], title: v }; setContent({ ...content, entreprise: { ...content.entreprise, pillars } }); }} />
                    <Field label="Description" value={p.description} onChange={(v) => { const pillars = [...content.entreprise.pillars]; pillars[i] = { ...pillars[i], description: v }; setContent({ ...content, entreprise: { ...content.entreprise, pillars } }); }} multiline />
                  </div>
                ))}
                {content.entreprise.steps.map((s, i) => (
                  <div key={i} className="border-t border-gold/20 pt-3">
                    <Field label={`Étape ${s.step}`} value={s.title} onChange={(v) => { const steps = [...content.entreprise.steps]; steps[i] = { ...steps[i], title: v }; setContent({ ...content, entreprise: { ...content.entreprise, steps } }); }} />
                    <Field label="Description" value={s.description} onChange={(v) => { const steps = [...content.entreprise.steps]; steps[i] = { ...steps[i], description: v }; setContent({ ...content, entreprise: { ...content.entreprise, steps } }); }} multiline />
                  </div>
                ))}
              </SectionCard>
            </div>
          ) : tab === "honoraires" ? (
            <div className="space-y-4">
              <SectionCard title="Hero"><HeroEditor hero={content.honoraires.hero} onChange={(h) => setContent({ ...content, honoraires: { ...content.honoraires, hero: h } })} /></SectionCard>
              <SectionCard title="Contenu">
                <StringListEditor label="Paragraphes" items={content.honoraires.paragraphs} onChange={(v) => setContent({ ...content, honoraires: { ...content.honoraires, paragraphs: v } })} />
                <Field label="Encadré highlight" value={content.honoraires.highlightBox} onChange={(v) => setContent({ ...content, honoraires: { ...content.honoraires, highlightBox: v } })} multiline />
                {content.honoraires.factors.map((f, i) => (
                  <div key={i} className="border-t border-gold/20 pt-3">
                    <Field label={f.title} value={f.description} onChange={(v) => { const factors = [...content.honoraires.factors]; factors[i] = { ...factors[i], description: v }; setContent({ ...content, honoraires: { ...content.honoraires, factors } }); }} multiline />
                  </div>
                ))}
              </SectionCard>
            </div>
          ) : tab === "equipe" ? (
            <div className="space-y-4">
              <SectionCard title="Hero"><HeroEditor hero={content.equipe.hero} onChange={(h) => setContent({ ...content, equipe: { ...content.equipe, hero: h } })} /></SectionCard>
              <SectionCard title="Équipe">
                <Field label="Introduction" value={content.equipe.intro} onChange={(v) => setContent({ ...content, equipe: { ...content.equipe, intro: v } })} multiline />
                {content.equipe.members.map((m, i) => (
                  <div key={i} className="mt-4 border border-gold/20 p-4">
                    <Field label="Nom" value={m.name} onChange={(v) => { const members = [...content.equipe.members]; members[i] = { ...members[i], name: v }; setContent({ ...content, equipe: { ...content.equipe, members } }); }} />
                    <Field label="Rôle" value={m.role} onChange={(v) => { const members = [...content.equipe.members]; members[i] = { ...members[i], role: v }; setContent({ ...content, equipe: { ...content.equipe, members } }); }} />
                    <Field label="Titre" value={m.title} onChange={(v) => { const members = [...content.equipe.members]; members[i] = { ...members[i], title: v }; setContent({ ...content, equipe: { ...content.equipe, members } }); }} />
                    <Field label="Bio" value={m.bio} onChange={(v) => { const members = [...content.equipe.members]; members[i] = { ...members[i], bio: v }; setContent({ ...content, equipe: { ...content.equipe, members } }); }} multiline rows={4} />
                    <StringListEditor label="Spécialités" items={m.specialties} onChange={(v) => { const members = [...content.equipe.members]; members[i] = { ...members[i], specialties: v }; setContent({ ...content, equipe: { ...content.equipe, members } }); }} />
                    <Field label="Depuis (barreau)" value={m.since ?? ""} onChange={(v) => { const members = [...content.equipe.members]; members[i] = { ...members[i], since: v }; setContent({ ...content, equipe: { ...content.equipe, members } }); }} />
                  </div>
                ))}
                <button type="button" onClick={() => setContent({ ...content, equipe: { ...content.equipe, members: [...content.equipe.members, { name: "Maître [Nom]", role: "Avocat", title: "Avocat au Barreau de Annaba", bio: "", specialties: [] }] } })} className="text-xs text-gold">+ Ajouter un avocat</button>
              </SectionCard>
            </div>
          ) : tab === "liens" ? (
            <div className="space-y-4">
              <SectionCard title="Hero"><HeroEditor hero={content.liens.hero} onChange={(h) => setContent({ ...content, liens: { ...content.liens, hero: h } })} /></SectionCard>
              <SectionCard title="Liens utiles">
                {content.liens.links.map((link, i) => (
                  <div key={i} className="mb-3 border-t border-gold/20 pt-3">
                    <Field label="Nom" value={link.name} onChange={(v) => { const links = [...content.liens.links]; links[i] = { ...links[i], name: v }; setContent({ ...content, liens: { ...content.liens, links } }); }} />
                    <Field label="Description" value={link.description} onChange={(v) => { const links = [...content.liens.links]; links[i] = { ...links[i], description: v }; setContent({ ...content, liens: { ...content.liens, links } }); }} multiline />
                    <Field label="URL" value={link.url} onChange={(v) => { const links = [...content.liens.links]; links[i] = { ...links[i], url: v }; setContent({ ...content, liens: { ...content.liens, links } }); }} />
                  </div>
                ))}
                <button type="button" onClick={() => setContent({ ...content, liens: { ...content.liens, links: [...content.liens.links, { name: "Nouveau lien", description: "", url: "https://" }] } })} className="text-xs text-gold">+ Ajouter un lien</button>
              </SectionCard>
            </div>
          ) : (
            <div className="space-y-6">
              <form onSubmit={saveArticle} className="border border-gold/25 bg-parchment p-5 space-y-3">
                <h3 className="font-serif text-lg">{editingArticleId ? "Modifier l'article" : "Nouvel article"}</h3>
                <Field label="Titre" value={articleForm.title} onChange={(v) => setArticleForm({ ...articleForm, title: v })} />
                <Field label="Extrait" value={articleForm.excerpt} onChange={(v) => setArticleForm({ ...articleForm, excerpt: v })} multiline />
                <Field label="Contenu" value={articleForm.content} onChange={(v) => setArticleForm({ ...articleForm, content: v })} multiline rows={10} />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={articleForm.published} onChange={(e) => setArticleForm({ ...articleForm, published: e.target.checked })} className="accent-gold" />
                  Publier
                </label>
                <button type="submit" className="btn-primary">{editingArticleId ? "Mettre à jour" : "Créer"}</button>
              </form>
              <ul className="space-y-3">
                {articles.map((a) => (
                  <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 border border-gold/25 bg-cream p-4">
                    <div>
                      <p className="font-serif">{a.title}</p>
                      <p className="text-xs text-stone">{a.published ? "Publié" : "Brouillon"}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => { setEditingArticleId(a.id); setArticleForm({ title: a.title, excerpt: a.excerpt ?? "", content: a.content, published: a.published }); }} className="btn-outline px-3 py-1 text-xs">Modifier</button>
                      <button type="button" onClick={() => deleteArticle(a.id)} className="border border-red-200 px-2 text-red-700"><Trash2 size={14} /></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
