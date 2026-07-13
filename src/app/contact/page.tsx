import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/shared/ContactForm";
import { Map } from "@/components/shared/Map";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/lib/data/restaurant";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte Bistro Mali Raj u Vukovaru — adresa, telefon, radno vrijeme i lokacija na karti.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Javite nam se"
        description="Pitanja, rezervacije ili prijedlozi — tu smo za vas svaki dan u tjednu."
        image="https://images.unsplash.com/photo-1576089073624-b5751a8f4de9?q=80&w=2400&auto=format&fit=crop"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl2 border border-line bg-bg-card p-6">
              <MapPin size={22} className="text-ember-300" />
              <h3 className="mt-4 font-display font-semibold text-white">Adresa</h3>
              <p className="mt-1 text-sm text-muted">{restaurant.address.full}</p>
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  restaurant.address.full
                )}`}
                variant="outline"
                size="sm"
                icon={Navigation}
                iconPosition="left"
                className="mt-4"
              >
                Ruta do nas
              </Button>
            </div>

            <div className="rounded-xl2 border border-line bg-bg-card p-6">
              <Phone size={22} className="text-ember-300" />
              <h3 className="mt-4 font-display font-semibold text-white">Telefon i e-mail</h3>
              <p className="mt-1 text-sm text-muted">{restaurant.phoneDisplay}</p>
              <p className="text-sm text-muted">{restaurant.email}</p>
              <Button href={`tel:${restaurant.phone}`} variant="outline" size="sm" icon={Phone} iconPosition="left" className="mt-4">
                Nazovi
              </Button>
            </div>

            <div className="rounded-xl2 border border-line bg-bg-card p-6">
              <Clock size={22} className="text-ember-300" />
              <h3 className="mt-4 font-display font-semibold text-white">Radno vrijeme</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {restaurant.hours.slice(0, 3).map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="tabular-price">{h.open}–{h.close}</span>
                  </li>
                ))}
                <li className="pt-1 text-xs text-gray-500">...i ostatak tjedna, vidi footer</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-deep py-16 md:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Pošaljite upit"
                title="Imate pitanje ili prijedlog?"
                className="mx-0"
              />
              <div className="mt-8 rounded-xl2 border border-line bg-bg-card p-6 md:p-8">
                <ContactForm variant="contact" />
              </div>
            </div>
            <div>
              <SectionHeading
                align="left"
                eyebrow="Lokacija"
                title="Pronađite nas na karti"
                className="mx-0"
              />
              <div className="mt-8 overflow-hidden rounded-xl2 border border-line">
                <Map height={460} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
