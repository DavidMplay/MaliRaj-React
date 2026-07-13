"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative flex h-[52vh] min-h-[380px] items-end overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-black/40" />
      <div className="absolute inset-0 bg-grain" />

      <div className="relative mx-auto w-full max-w-content px-4 pb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-ember-300">
            <span className="h-px w-6 bg-ember-300" />
            {eyebrow}
          </span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold text-balance text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-xl text-base text-gray-300 md:text-lg">{description}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
