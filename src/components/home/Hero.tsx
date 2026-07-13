"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { UtensilsCrossed, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OrderButton } from "@/components/shared/OrderButton";
import { restaurant } from "@/lib/data/restaurant";
import { averageRating, testimonials } from "@/lib/data/testimonials";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2400&auto=format&fit=crop"
          alt="Sočna pljeskavica s roštilja i domaći prilozi u Bistro Mali Raj"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-grain" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur-md"
          >
            <span className="flex items-center gap-1 text-ember-200">
              <Star size={15} fill="currentColor" />
              {averageRating}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>{testimonials.length}+ ocjena gostiju</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>Vukovar</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-extrabold leading-[1.05] text-balance text-white sm:text-6xl md:text-7xl"
          >
            {restaurant.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-lg text-lg text-gray-200 md:text-xl"
          >
            {restaurant.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="/menu" size="lg" icon={UtensilsCrossed} iconPosition="left">
              Pogledaj jelovnik
            </Button>
            <OrderButton variant="ghost" size="lg">
              Naruči odmah
            </OrderButton>
            <Button href={`tel:${restaurant.phone}`} variant="outline" size="lg" icon={Phone} iconPosition="left">
              Nazovi nas
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-gray-300 sm:flex"
      >
        <span>Skrolaj</span>
        <span className="h-8 w-px bg-gradient-to-b from-gray-300 to-transparent" />
      </motion.div>
    </section>
  );
}
