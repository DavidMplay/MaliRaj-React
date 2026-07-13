import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

export function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <div className="ticket-edge flex w-[320px] shrink-0 flex-col gap-4 rounded-b-xl2 rounded-t-md border border-line border-t-0 bg-bg-card p-6 pt-7 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-ember-300">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={15} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1.5} />
          ))}
        </div>
        <span className="text-xs font-medium text-gray-500">{review.source}</span>
      </div>
      <p className="text-sm leading-relaxed text-gray-300">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-auto flex items-center justify-between border-t border-dashed border-line pt-4">
        <span className="font-display text-sm font-semibold text-white">{review.name}</span>
        <span className="text-xs text-gray-500">{review.date}</span>
      </div>
    </div>
  );
}
