import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { restaurant } from "@/lib/data/restaurant";

export function StatsSection() {
  return (
    <section className="relative border-y border-line bg-bg-deep py-14">
      <div className="mx-auto grid max-w-content grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {restaurant.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
