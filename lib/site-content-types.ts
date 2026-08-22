export type HeroContent = {
  label: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
};

export type TextItem = {
  title: string;
  description: string;
  icon?: string;
};

export type StepItem = {
  step: string;
  title: string;
  description: string;
};

export type TeamMemberContent = {
  name: string;
  role: string;
  title: string;
  bio: string;
  specialties: string[];
  since?: string;
  photo?: string;
  photoAlt?: string;
};

export type LinkItem = {
  name: string;
  description: string;
  url: string;
};

export type CompetenceItem = {
  roman: string;
  icon: string;
  title: string;
  description: string;
};

export type NavItem = {
  href: string;
  label: string;
};

export type SiteContent = {
  global: {
    siteName: string;
    logoLine1: string;
    logoLine2: string;
    logoLine3: string;
    footerDescription: string;
    footerCopyright: string;
    barreauNote: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
  };
  navigation: NavItem[];
  contact: {
    address: string;
    phones: string[];
    email: string;
    mapQuery: string;
    subjectOptions: string[];
    formTitle: string;
    formDescription: string;
    coordsTitle: string;
  };
  home: {
    carousel: { src: string; alt: string }[];
    hero: {
      label: string;
      title: string;
      subtitle: string;
      inscription: string;
      btnPrimary: string;
      btnSecondary: string;
    };
    domainsSection: { label: string; title: string; items: TextItem[] };
    expertiseSection: { label: string; title: string; items: TextItem[]; btnText: string };
    ctaSection: { title: string; description: string; btnText: string };
  };
  presentation: {
    hero: HeroContent;
    paragraphsLeft: string[];
    paragraphsRight: string[];
    quote: string;
    experienceYears: string;
    experienceLabel: string;
    domainsTitle: string;
    domains: string[];
    btnText: string;
  };
  objectifs: {
    hero: HeroContent;
    paragraphs: string[];
    valuesTitle: string;
    values: TextItem[];
    quote: string;
    missions: TextItem[];
  };
  competences: {
    hero: HeroContent;
    intro: string[];
    items: CompetenceItem[];
  };
  entreprise: {
    hero: HeroContent;
    paragraphs: string[];
    pillarsTitle: string;
    pillars: TextItem[];
    stepsTitle: string;
    steps: StepItem[];
  };
  honoraires: {
    hero: HeroContent;
    paragraphs: string[];
    factorsTitle: string;
    factors: TextItem[];
    highlightBox: string;
    btnText: string;
  };
  equipe: {
    hero: HeroContent;
    intro: string;
    members: TeamMemberContent[];
  };
  liens: {
    hero: HeroContent;
    links: LinkItem[];
  };
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? U[]
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};
