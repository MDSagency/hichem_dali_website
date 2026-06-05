import {
  Building2,
  Scale,
  Landmark,
  Ship,
  Users,
  Receipt,
  Briefcase,
  Home,
  Anchor,
  Building,
  Banknote,
  Shield,
  Gem,
  Gavel,
  Lock,
  Zap,
  Award,
  Clock,
  FileText,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export const heroCarouselImages = [
  { src: "/images/boona-1.jpg", alt: "Vue historique de Bône (Annaba)" },
  { src: "/images/boona-2.jpg", alt: "Photographie vintage de la ville de Bône" },
  { src: "/images/boona-3.jpg", alt: "Patrimoine architectural de Annaba" },
];

export const mainDomains = [
  {
    icon: Briefcase,
    title: "Droit des affaires",
    description: "Conseil et contentieux pour entreprises et dirigeants.",
  },
  {
    icon: Landmark,
    title: "Droit administratif",
    description: "Représentation devant les juridictions administratives.",
  },
  {
    icon: Home,
    title: "Droit foncier",
    description: "Urbanisme, copropriété et questions de propriété.",
  },
];

export const expertiseCards = [
  {
    icon: Building2,
    title: "Droit des affaires",
    description: "Accompagnement complet des entreprises en matière commerciale et contractuelle.",
  },
  {
    icon: Scale,
    title: "Droit administratif",
    description: "Défense des intérêts devant les tribunaux administratifs.",
  },
  {
    icon: Home,
    title: "Droit foncier",
    description: "Urbanisme, copropriété et transactions immobilières.",
  },
  {
    icon: Ship,
    title: "Droit maritime",
    description: "Contentieux et conseil en matière de transport et commerce maritime.",
  },
];

export const presentationDomains = [
  "Droit des affaires",
  "Droit administratif",
  "Droit foncier",
  "Droit maritime",
];

export const values = [
  {
    icon: Lock,
    title: "Confidentialité",
    description: "Protection absolue des informations et des dossiers confiés au cabinet.",
  },
  {
    icon: Zap,
    title: "Réactivité",
    description: "Réponses rapides et suivi attentif de chaque situation juridique.",
  },
  {
    icon: Award,
    title: "Expertise",
    description: "Plus de 25 ans d'expérience au service des entreprises et particuliers.",
  },
];

export const missions = [
  {
    title: "Conseil juridique",
    description:
      "Analyse de l'opportunité d'engager une action, de signer un contrat ou de constituer une société.",
  },
  {
    title: "Contentieux",
    description:
      "Représentation et défense devant toutes les juridictions de l'ordre judiciaire.",
  },
  {
    title: "Médiation",
    description:
      "Intervention auprès de tiers pour tenter une conciliation en tant que médiateur.",
  },
];

export type Competence = {
  roman: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const competences: Competence[] = [
  {
    roman: "I",
    icon: Users,
    title: "Droit des personnes",
    description: "Famille, succession et donations, patrimoine.",
  },
  {
    roman: "II",
    icon: Building2,
    title: "Droit des sociétés et commercial",
    description: "Création, gestion et litiges des sociétés commerciales.",
  },
  {
    roman: "III",
    icon: Receipt,
    title: "Droit fiscal",
    description: "Optimisation et contentieux en matière fiscale.",
  },
  {
    roman: "IV",
    icon: Briefcase,
    title: "Droit social",
    description: "Relations de travail et procédures de licenciement.",
  },
  {
    roman: "V",
    icon: Home,
    title: "Droit foncier",
    description: "Urbanisme, copropriété et propriété.",
  },
  {
    roman: "VI",
    icon: Anchor,
    title: "Droit maritime",
    description: "Transport maritime et commerce international.",
  },
  {
    roman: "VII",
    icon: Landmark,
    title: "Droit public",
    description: "Marchés publics et contentieux administratif.",
  },
  {
    roman: "VIII",
    icon: Banknote,
    title: "Droit bancaire",
    description: "Relations bancaires et contentieux financier.",
  },
  {
    roman: "IX",
    icon: Shield,
    title: "Droit pénal",
    description: "Défense pénale et assistance devant les juridictions répressives.",
  },
  {
    roman: "X",
    icon: Gem,
    title: "Droit d'investissement et des mines",
    description: "Accompagnement des investisseurs et activités extractives.",
  },
  {
    roman: "XI",
    icon: Gavel,
    title: "Mesures d'exécutions forcées et conservatoires",
    description: "Recouvrement et sécurisation des créances.",
  },
];

export const enterprisePillars = [
  { title: "Confiance", description: "Un pacte de confiance au cœur de chaque relation client." },
  {
    title: "Confidentialité",
    description: "Discrétion absolue dans le traitement de vos dossiers.",
  },
  { title: "Réactivité", description: "Réponses et actions adaptées aux enjeux de l'entreprise." },
  {
    title: "Suivi personnalisé",
    description: "Un interlocuteur dédié pour un accompagnement sur mesure.",
  },
];

export const interventionSteps = [
  { step: "01", title: "Premier entretien", description: "Analyse de votre situation et de vos objectifs." },
  { step: "02", title: "Convention d'honoraires", description: "Transparence sur les modalités et les coûts." },
  { step: "03", title: "Stratégie juridique", description: "Élaboration d'une approche adaptée à votre dossier." },
  { step: "04", title: "Suivi et représentation", description: "Accompagnement complet jusqu'à la résolution." },
];

export const honorairesFactors = [
  {
    icon: FileText,
    title: "Difficulté du dossier",
    description: "La complexité juridique et les enjeux spécifiques de chaque affaire.",
  },
  {
    icon: Clock,
    title: "Temps consacré",
    description: "Le temps passé dans le traitement du dossier et en audience.",
  },
  {
    icon: Scale,
    title: "Importance des intérêts",
    description: "L'ampleur des intérêts en cause dans la procédure.",
  },
];

export const usefulLinks = [
  {
    name: "Journal Officiel de la République Algérienne",
    description: "Publications officielles et textes législatifs.",
    url: "https://www.joradp.dz",
  },
  {
    name: "Ministère des Finances",
    description: "Informations fiscales et réglementaires.",
    url: "https://www.mf.gov.dz",
  },
  {
    name: "Chambre Algérienne de Commerce et d'Industrie (CACI)",
    description: "Accompagnement des entreprises algériennes.",
    url: "https://www.caci.dz",
  },
  {
    name: "Agence Algérienne de Promotion de l'Investissement (AAPI)",
    description: "Promotion et facilitation de l'investissement.",
    url: "https://www.aapi.dz",
  },
  {
    name: "Douane Algérienne",
    description: "Réglementation douanière et procédures d'import-export.",
    url: "https://www.douane.gov.dz",
  },
  {
    name: "Banque d'Algérie",
    description: "Politique monétaire et réglementation bancaire.",
    url: "https://www.bank-of-algeria.dz",
  },
];

export const contactInfo = {
  address: "05, Cours de la Révolution, Annaba, Algérie",
  phones: ["+213 5 51 38 89 39", "+213 6 64 97 41 22", "+213 38 45 18 41"],
  email: "daliavocat@gmail.com",
};

export const subjectOptions = [
  "Conseil juridique",
  "Représentation",
  "Investissement",
  "Autre",
] as const;
