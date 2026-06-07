"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import { subjectOptions } from "@/lib/data";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error ?? "Une erreur est survenue.");
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="section-label mb-2 block">
          Nom complet *
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full border border-gold/25 bg-white/50 px-4 py-3 font-sans text-charcoal transition-colors focus:border-gold focus:outline-none"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-700" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="section-label mb-2 block">
          Adresse e-mail *
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full border border-gold/25 bg-white/50 px-4 py-3 font-sans text-charcoal transition-colors focus:border-gold focus:outline-none"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-700" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="section-label mb-2 block">
          Sujet *
        </label>
        <select
          id="subject"
          {...register("subject")}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className="w-full border border-gold/25 bg-white/50 px-4 py-3 font-sans text-charcoal transition-colors focus:border-gold focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Sélectionnez un sujet
          </option>
          {subjectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-700" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="section-label mb-2 block">
          Message *
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full resize-y border border-gold/25 bg-white/50 px-4 py-3 font-sans text-charcoal transition-colors focus:border-gold focus:outline-none"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-700" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Envoi en cours…
          </span>
        ) : (
          "Envoyer le message"
        )}
      </button>

      {status === "success" && (
        <p className="text-center text-sm text-green-800" role="status">
          Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
