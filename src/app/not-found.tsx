import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-8xl font-extrabold text-ember-300">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
        Ova stranica nije na jelovniku
      </h1>
      <p className="mt-3 max-w-md text-muted">
        Izgleda da smo pojeli tu stranicu prije nego ste stigli. Vratite se na početnu ili
        pogledajte naš jelovnik.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/" size="lg">
          Natrag na početnu
        </Button>
        <Button href="/menu" variant="outline" size="lg" icon={UtensilsCrossed} iconPosition="left">
          Pogledaj jelovnik
        </Button>
      </div>
    </section>
  );
}
