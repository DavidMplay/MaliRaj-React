"use client";

import { motion } from "framer-motion";
import { Phone, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/lib/data/restaurant";

interface CTASectionProps {
  title?: string;
  description?: string;
}

export function CTASection({
  title = "Gladni ste? Stol vas čeka.",
  description = "Rezervirajte stol, naručite dostavu ili nas jednostavno nazovite — vidimo se za stolom.",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ember-500 via-ember-400 to-ember-300 py-20 md:py-24">
      <div className="absolute inset-0 bg-grain opacity-40" />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-flame"
      />
      <div className="relative mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl font-display text-3xl font-bold text-balance text-white sm:text-4xl md:text-5xl"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-4 max-w-lg text-base text-white/90 md:text-lg"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Button href="/menu" variant="secondary" size="lg" icon={UtensilsCrossed} iconPosition="left">
            Pogledaj jelovnik
          </Button>
          <Button
            href={`tel:${restaurant.phone}`}
            variant="ghost"
            size="lg"
            icon={Phone}
            iconPosition="left"
            className="border-white/30 text-white"
          >
            {restaurant.phoneDisplay}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
