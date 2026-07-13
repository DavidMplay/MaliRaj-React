import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/catering/FeatureCard";
import { ContactForm } from "@/components/shared/ContactForm";
import { Gallery } from "@/components/gallery/Gallery";
import { FAQ } from "@/components/shared/FAQ";
import { cateringPackages, faqItems } from "@/lib/data/misc";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Catering usluge Bistro Mali Raj za vjenčanja, krštenja, rođendane i poslovne događaje u Vukovaru i okolici.",
  alternates: { canonical: "/catering" },
};

const includedFeatures = [
  "Prilagođen jelovnik prema vašim željama",
  "Profesionalno posluženje na lokaciji",
  "Dekoracija stola po dogovoru",
  "Prijevoz i postava opreme",
  "Opcije za vegetarijance i alergije",
  "Fleksibilan broj gostiju",
];

export default function CateringPage() {
  return (
    <>
      <PageHero
        eyebrow="Catering usluge"
        title="Vaš događaj, naša kuhinja"
        description="Od intimnih obiteljskih okupljanja do velikih vjenčanja — donosimo okuse Bistro Mali Raj tamo gdje je vaša proslava."
        image="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2400&auto=format&fit=crop"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Za svaku prigodu"
            title="Catering paketi prilagođeni vašem slavlju"
            description="Bez obzira na veličinu ili vrstu događaja, gradimo jelovnik oko vaših gostiju i vašeg budžeta."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cateringPackages.map((pkg, i) => (
              <FeatureCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-deep py-16 md:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Što je uključeno"
                title="Sve što trebate za bezbrižnu proslavu"
                className="mx-0"
              />
              <ul className="mt-8 space-y-3">
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-ember-300" />
                    <span className="text-sm text-gray-300 md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Gallery showFilter={false} limit={4} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Česta pitanja"
            title="Sve što vas zanima o cateringu"
          />
          <div className="mt-10">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>

      <section id="upit" className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Zatražite ponudu"
            title="Ispunite upit za catering"
            description="Javite nam se s detaljima vašeg događaja i pripremit ćemo prilagođenu ponudu unutar 24 sata."
          />
          <div className="mt-10 rounded-xl2 border border-line bg-bg-card p-6 md:p-8">
            <ContactForm variant="catering" />
          </div>
        </div>
      </section>
    </>
  );
}
