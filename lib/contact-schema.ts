import { z } from "zod";
import { subjectOptions } from "@/lib/data";

export const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse e-mail invalide"),
  subject: z.enum(subjectOptions, {
    errorMap: () => ({ message: "Veuillez sélectionner un sujet" }),
  }),
  message: z.string().min(20, "Le message doit contenir au moins 20 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
