import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: never;
};

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

const variants = {
  primary:
    "bg-ember-300 text-white hover:bg-ember-400 shadow-glow hover:shadow-none",
  secondary:
    "bg-white text-bg-deep hover:bg-white/90",
  ghost: "bg-white/5 text-white hover:bg-white/10 backdrop-blur-md border border-white/10",
  outline: "bg-transparent text-white border border-white/25 hover:border-ember-300 hover:text-ember-200",
};

const sizes = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-base md:text-lg gap-2.5",
};

/**
 * Shared Button — renders as a Next.js Link when `href` is provided,
 * otherwise as a native <button>. Keeps a single visual language across
 * every CTA on the site.
 */
export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  className,
  children,
  href,
  ...props
}: ButtonAsLink | ButtonAsButton) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-display font-semibold transition-all duration-300 whitespace-nowrap",
    "focus-visible:outline-2 focus-visible:outline-ember-300 focus-visible:outline-offset-2",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon size={size === "lg" ? 20 : 18} aria-hidden />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon size={size === "lg" ? 20 : 18} aria-hidden />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
