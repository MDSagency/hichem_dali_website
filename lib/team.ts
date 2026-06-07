export type TeamMember = {
  name: string;
  role: string;
  title: string;
  bio: string;
  specialties: string[];
  since?: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Maître DALI Hichem",
    role: "Fondateur & Associé principal",
    title: "Avocat à la Cour Suprême & au Conseil d'État",
    bio: "Inscrit au Barreau de Annaba depuis le 28 juin 1999, Maître DALI Hichem dirige le cabinet et intervient principalement en droit des affaires, droit administratif, droit foncier et droit maritime. Il a développé une expertise reconnue en droit des marchés publics.",
    specialties: [
      "Droit des affaires",
      "Droit administratif",
      "Droit foncier",
      "Droit maritime",
      "Marchés publics",
    ],
    since: "1999",
  },
  {
    name: "Maître [Nom Collaborateur]",
    role: "Avocat collaborateur",
    title: "Avocat au Barreau de Annaba",
    bio: "Spécialisé en droit des sociétés et contentieux commercial, il accompagne les entreprises dans leurs opérations juridiques quotidiennes et leur représentation devant les juridictions.",
    specialties: ["Droit des sociétés", "Droit commercial", "Contentieux"],
  },
  {
    name: "Maître [Nom Collaboratrice]",
    role: "Avocat collaboratrice",
    title: "Avocat au Barreau de Annaba",
    bio: "Intervient en droit social et droit des personnes, avec une approche rigoureuse et un suivi personnalisé de chaque dossier confié au cabinet.",
    specialties: ["Droit social", "Droit des personnes", "Droit fiscal"],
  },
];
