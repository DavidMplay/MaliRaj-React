import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/about/Timeline";
import { CTASection } from "@/components/home/CTASection";
import { Leaf, Users, ChefHat, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Upoznajte priču Bistro Mali Raj — obiteljski restoran u Vukovaru koji od 2011. godine servira domaće okuse s ljubavlju.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Leaf,
    title: "Svježi sastojci",
    description: "Namirnice biramo svakodnevno na lokalnoj tržnici i od provjerenih OPG-ova iz okolice.",
  },
  {
    icon: ChefHat,
    title: "Domaća priprema",
    description: "Svaki umak, tijesto i prilog radimo od nule — bez gotovih poluproizvoda.",
  },
  {
    icon: Users,
    title: "Obiteljska atmosfera",
    description: "Vodimo restoran kao vlastiti dom — gost kod nas nikad nije samo broj stola.",
  },
  {
    icon: Clock,
    title: "Brza dostava",
    description: "Naša dostava pokriva Vukovar i okolicu, s prosječnim vremenom isporuke ispod 30 minuta.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="O nama"
        title="Priča o Bistro Mali Raj"
        description="Trinaest godina služimo hranu koja spaja tradiciju Slavonije s modernim ukusom."
        image="https://images.unsplash.com/photo-1744561249162-c597c1670032?q=80&w=2400&auto=format&fit=crop"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Naš početak"
              title="Mali prostor, veliko srce od 2011."
              className="mx-0"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-300">
              <p>
                Bistro Mali Raj pokrenula je obitelj Horvat s jednostavnom idejom: ponuditi
                stanovnicima Vukovara mjesto gdje se hrana priprema s istom pažnjom kao kod kuće.
                Ono što je počelo kao mali bistro s tri jela na jelovniku, danas je omiljeno
                okupljalište za burgere, pizzu, roštilj i dnevne obroke.
              </p>
              <p>
                Naša filozofija se nije promijenila — svježe namirnice, poštene cijene i osoblje
                koje pamti vaše ime. Bilo da svraćate na brzi ručak, naručujete dostavu ili
                slavite poseban trenutak s nama, trudimo se da se osjećate kao dio obitelji.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1761095596765-c8abe01d3aea?q=80&w=1200&auto=format&fit=crop"
              alt="Kuhar u kuhinji Bistro Mali Raj priprema jelo"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-bg-deep py-16 md:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Naše vrijednosti"
            title="Zašto nam gosti vjeruju"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl2 border border-line bg-bg-card p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-ember-300/10 text-ember-300">
                  <v.icon size={22} />
                </div>
                <h3 className="mt-4 font-display font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Naš put" title="Od malog bistroa do omiljene adrese u gradu" />
          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      <CTASection
        title="Dođite i upoznajte nas uživo"
        description="Najbolji način da upoznate Bistro Mali Raj jest za jednim od naših stolova."
      />
    </>
  );
}
