"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Leaf, ChefHat, Truck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const features = [
  { icon: Users, label: "Obiteljska atmosfera" },
  { icon: Leaf, label: "Svježi, lokalni sastojci" },
  { icon: ChefHat, label: "Domaća priprema" },
  { icon: Truck, label: "Brza dostava" },
];

export function AboutPreview() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1576089073624-b5751a8f4de9?q=80&w=1200&auto=format&fit=crop"
              alt="Obitelj uživa u ručku u Bistro Mali Raj"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-xl2 border border-line bg-bg-card p-5 shadow-card sm:block">
            <p className="font-display text-3xl font-bold text-ember-300">
              {new Date().getFullYear() - 2011}+
            </p>
            <p className="text-sm text-muted">godina u srcu Vukovara</p>
          </div>
        </motion.div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Naša priča"
            title="Obiteljski bistro s dušom Vukovara"
            description="Bistro Mali Raj vodi se jednostavnim receptom: svježi sastojci, domaća priprema i gostoljubivost kakvu pamtite od bake. Od burgera i pizze do roštilja i dnevnih jela — svaki tanjur pripremamo kao da je za našu obitelj."
            className="mx-0"
          />

          <div className="mt-8 grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-xl border border-line bg-bg-card p-4"
              >
                <f.icon size={20} className="shrink-0 text-ember-300" />
                <span className="text-sm font-medium text-gray-200">{f.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/about" variant="outline">
              Saznaj više o nama
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
