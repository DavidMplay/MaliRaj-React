"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, restaurant } from "@/lib/data/restaurant";
import { OrderButton } from "@/components/shared/OrderButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line/80 bg-bg-deep/85 backdrop-blur-lg"
          : "border-b border-transparent bg-gradient-to-b from-black/60 to-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-white lg:text-2xl">
          Mali<span className="text-ember-300">Raj</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-white" : "text-gray-300 hover:text-white"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-ticket"
                      className="absolute inset-x-3 -bottom-1 h-[2px] bg-ember-300"
                      style={{
                        maskImage:
                          "radial-gradient(circle, black 60%, transparent 61%)",
                        maskSize: "6px 2px",
                        maskRepeat: "repeat-x",
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${restaurant.phone}`}
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white"
          >
            <Phone size={16} className="text-ember-300" />
            {restaurant.phoneDisplay}
          </a>
          <OrderButton size="sm">Naruči odmah</OrderButton>
        </div>

        <button
          className="rounded-lg p-2 text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Zatvori izbornik" : "Otvori izbornik"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-bg-deep/98 backdrop-blur-lg lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                      pathname === link.href
                        ? "bg-ember-300/10 text-ember-200"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 border-t border-line px-4 py-4">
              <OrderButton className="w-full" size="md">
                Naruči odmah
              </OrderButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
