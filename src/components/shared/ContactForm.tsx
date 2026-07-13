"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  variant?: "contact" | "catering";
}

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-line bg-bg-deep px-4 py-3 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-ember-300 focus:outline-none";

export function ContactForm({ variant = "contact" }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Molimo unesite ime.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Molimo unesite ispravnu e-mail adresu.";
    }
    if (!message) newErrors.message = "Molimo unesite poruku.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus("submitting");
    // NOTE for integration: wire this up to an API route (e.g. /api/contact)
    // that sends an email via Resend/SendGrid, or point the form at a
    // service like Formspree. Simulated here since no backend is connected.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    e.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 rounded-xl2 border border-ember-300/30 bg-ember-300/5 p-10 text-center"
      >
        <CheckCircle2 size={40} className="text-ember-300" />
        <h3 className="font-display text-xl font-bold text-white">Poruka poslana!</h3>
        <p className="max-w-sm text-sm text-muted">
          Hvala na upitu. Javit ćemo vam se u najkraćem mogućem roku, obično unutar 24 sata.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Pošalji novu poruku
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
            Ime i prezime
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={cn(inputClasses, errors.name && "border-red-500")}
            placeholder="Vaše ime"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={cn(inputClasses, errors.email && "border-red-500")}
            placeholder="vas@email.hr"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-300">
            Telefon <span className="text-gray-500">(neobavezno)</span>
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} placeholder="09X XXX XXXX" />
        </div>

        {variant === "catering" ? (
          <div>
            <label htmlFor="guests" className="mb-1.5 block text-sm font-medium text-gray-300">
              Broj gostiju
            </label>
            <input id="guests" name="guests" type="number" min={1} className={inputClasses} placeholder="npr. 40" />
          </div>
        ) : (
          <div>
            <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-300">
              Tema
            </label>
            <select id="subject" name="subject" className={inputClasses}>
              <option>Opći upit</option>
              <option>Rezervacija stola</option>
              <option>Dostava</option>
              <option>Catering</option>
              <option>Ostalo</option>
            </select>
          </div>
        )}
      </div>

      {variant === "catering" && (
        <div>
          <label htmlFor="event-date" className="mb-1.5 block text-sm font-medium text-gray-300">
            Datum događaja <span className="text-gray-500">(neobavezno)</span>
          </label>
          <input id="event-date" name="eventDate" type="date" className={inputClasses} />
        </div>
      )}

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-300">
          Poruka
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={cn(inputClasses, "resize-none", errors.message && "border-red-500")}
          placeholder={
            variant === "catering"
              ? "Recite nam nešto o vašem događaju — vrsta proslave, željeni jelovnik, lokacija..."
              : "Kako vam možemo pomoći?"
          }
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        icon={status === "submitting" ? Loader2 : Send}
        iconPosition="right"
        disabled={status === "submitting"}
        className={cn("w-full sm:w-auto", status === "submitting" && "cursor-not-allowed opacity-70 [&_svg]:animate-spin")}
      >
        {status === "submitting" ? "Slanje..." : "Pošalji poruku"}
      </Button>
    </form>
  );
}
