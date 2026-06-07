type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
};

export function Field({ label, value, onChange, multiline, rows = 3, hint }: FieldProps) {
  const className =
    "w-full border border-gold/25 bg-cream px-3 py-2 text-sm focus:border-gold focus:outline-none";
  return (
    <div>
      <label className="section-label mb-1 block text-xs">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={className}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      )}
      {hint && <p className="mt-1 text-xs text-stone">{hint}</p>}
    </div>
  );
}

export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 border border-gold/25 bg-parchment p-5">
      <h3 className="font-serif text-lg">{title}</h3>
      {children}
    </div>
  );
}

export function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div>
      <label className="section-label mb-2 block text-xs">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 border border-gold/25 bg-cream px-3 py-2 text-sm focus:border-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="border border-red-200 px-2 text-xs text-red-700"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="text-xs text-gold hover:underline"
        >
          + Ajouter
        </button>
      </div>
    </div>
  );
}

type HeroData = {
  label: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
};

export function HeroEditor({
  hero,
  onChange,
}: {
  hero: HeroData;
  onChange: (hero: HeroData) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Étiquette" value={hero.label} onChange={(v) => onChange({ ...hero, label: v })} />
      <Field label="Titre" value={hero.title} onChange={(v) => onChange({ ...hero, title: v })} />
      <Field label="Sous-titre" value={hero.subtitle} onChange={(v) => onChange({ ...hero, subtitle: v })} />
    </div>
  );
}
