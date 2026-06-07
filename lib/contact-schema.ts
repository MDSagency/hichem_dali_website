import { z } from "zod";

export function createContactSchema(subjectOptions: string[]) {
  const options = subjectOptions.filter(Boolean);
  const enumValues = (options.length > 0 ? options : ["Autre"]) as [string, ...string[]];

  return z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse e-mail invalide"),
    subject: z.enum(enumValues, {
      errorMap: () => ({ message: "Veuillez sélectionner un sujet" }),
    }),
    message: z.string().min(20, "Le message doit contenir au moins 20 caractères"),
  });
}

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
