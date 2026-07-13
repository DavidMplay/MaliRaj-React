"use client";

import { useState } from "react";
import { Phone, MessageCircle, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { restaurant } from "@/lib/data/restaurant";

interface OrderButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "outline";
  className?: string;
  children?: React.ReactNode;
}

export function OrderButton({ size = "md", variant = "primary", className, children }: OrderButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size={size}
        variant={variant}
        className={className}
        icon={ShoppingBag}
        iconPosition="left"
        onClick={() => setOpen(true)}
      >
        {children ?? "Naruči odmah"}
      </Button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Kako biste željeli naručiti?">
        <div className="space-y-3">
          <a
            href={`tel:${restaurant.phone}`}
            className="flex items-center gap-4 rounded-xl border border-line bg-bg-deep p-4 transition-colors hover:border-ember-300"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ember-300/10 text-ember-300">
              <Phone size={20} />
            </span>
            <span>
              <span className="block font-display font-semibold text-white">Nazovite nas</span>
              <span className="block text-sm text-muted">{restaurant.phoneDisplay}</span>
            </span>
          </a>

          <a
            href={`https://wa.me/${restaurant.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-line bg-bg-deep p-4 transition-colors hover:border-ember-300"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
              <MessageCircle size={20} />
            </span>
            <span>
              <span className="block font-display font-semibold text-white">WhatsApp narudžba</span>
              <span className="block text-sm text-muted">Pošaljite nam poruku</span>
            </span>
          </a>

          <a
            href="/menu"
            className="flex items-center gap-4 rounded-xl border border-line bg-bg-deep p-4 transition-colors hover:border-ember-300"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
              <UtensilsCrossed size={20} />
            </span>
            <span>
              <span className="block font-display font-semibold text-white">Pregledaj jelovnik</span>
              <span className="block text-sm text-muted">Odaberite jela pa nas nazovite</span>
            </span>
          </a>
        </div>
      </Modal>
    </>
  );
}
