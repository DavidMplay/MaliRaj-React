"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const milestones: TimelineItem[] = [
  {
    year: "2011",
    title: "Otvaranje malih vrata, velikog srca",
    description:
      "Obitelj Horvat otvara skromni bistro s desetak stolova na Županijskoj ulici — jelovnik od svega tri jela.",
  },
  {
    year: "2015",
    title: "Roštilj postaje zaštitni znak",
    description:
      "Uvodimo roštilj i ćevape po receptu koji se prenosi kroz generacije — gosti dolaze i iz susjednih gradova.",
  },
  {
    year: "2019",
    title: "Proširenje i nova kuhinja",
    description:
      "Restoran se širi na susjedni prostor, dobivamo kamenu peć za pizzu i zasebnu privatnu salu za slavlja.",
  },
  {
    year: "2022",
    title: "Catering usluga",
    description:
      "Pokrećemo catering za vjenčanja, krštenja i poslovne događaje — hrana Mali Raj sada putuje diljem Slavonije.",
  },
  {
    year: "Danas",
    title: "Ista obitelj, isti standard",
    description:
      "Preko 40.000 posluženih gostiju kasnije, i dalje svako jutro sami biramo namirnice na tržnici.",
  },
];

export function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-line md:left-1/2 md:-translate-x-1/2" />
      <div className="space-y-10">
        {milestones.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative flex flex-col gap-4 pl-10 md:grid md:grid-cols-2 md:gap-12 md:pl-0 ${
                isEven ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ember-300 bg-bg text-xs font-bold text-ember-300 md:left-1/2 md:-translate-x-1/2">
                {i + 1}
              </span>
              <div className={isEven ? "md:text-right md:pr-12" : "md:pl-12"}>
                <span className="font-display text-2xl font-bold text-ember-300">{item.year}</span>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
              <div aria-hidden />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
