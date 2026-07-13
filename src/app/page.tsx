import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Bistro Mali Raj — Pizza, Burgeri i Roštilj u Vukovaru",
  description:
    "Obiteljski bistro u Vukovaru s domaćim burgerima, pizzom, roštiljem i dnevnim jelima. Dostava, catering za sve prigode i topla, obiteljska atmosfera.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <AboutPreview />
      <FeaturedMenu />
      <Testimonials />
      <CTASection />
    </>
  );
}
