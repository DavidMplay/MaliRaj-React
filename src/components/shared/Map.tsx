import { restaurant } from "@/lib/data/restaurant";

interface MapProps {
  className?: string;
  height?: number;
}

export function Map({ className, height = 420 }: MapProps) {
  const query = encodeURIComponent(restaurant.address.full);

  return (
    <div className={className} style={{ height }}>
      <iframe
        title={`Lokacija — ${restaurant.name}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full rounded-xl2 grayscale-[20%] contrast-[1.05]"
      />
    </div>
  );
}
