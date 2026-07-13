import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "@/components/home/ReviewCard";
import { testimonials, averageRating } from "@/lib/data/testimonials";
import { Star } from "lucide-react";

export function Testimonials() {
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Riječi naših gostiju"
          title="Ono što kažu naši gosti"
          description={`Prosječna ocjena ${averageRating} od 5 na temelju stotina recenzija na Googleu i Facebooku.`}
        />
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-1 text-ember-300">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>
        </div>
      </div>

      <div className="group relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-32" />
        <div className="flex gap-6 [animation-play-state:running] group-hover:[animation-play-state:paused] animate-marquee">
          {loop.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
