import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import { restaurant, navLinks } from "@/lib/data/restaurant";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-deep">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-display text-2xl font-bold text-white">
              Mali<span className="text-ember-300">Raj</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {restaurant.shortDescription}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={restaurant.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-line p-2.5 text-white transition-colors hover:border-ember-300 hover:text-ember-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href={restaurant.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-line p-2.5 text-white transition-colors hover:border-ember-300 hover:text-ember-300"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Navigacija
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ember-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-ember-300" />
                {restaurant.address.full}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-ember-300" />
                <a href={`tel:${restaurant.phone}`} className="hover:text-ember-200">
                  {restaurant.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-ember-300" />
                <a href={`mailto:${restaurant.email}`} className="hover:text-ember-200">
                  {restaurant.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Radno vrijeme
            </h3>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              {restaurant.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2">
                    {h.day === "Petak" && <Clock size={14} className="text-ember-300" />}
                    {h.day}
                  </span>
                  <span className="tabular-price text-gray-300">
                    {h.open} – {h.close}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
          <p>
            © {year} {restaurant.legalName}. Sva prava pridržana.
          </p>
          <p>Vukovar, Hrvatska</p>
        </div>
      </div>
    </footer>
  );
}
