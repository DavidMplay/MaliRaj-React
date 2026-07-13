import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { JsonLd } from "@/components/shared/JsonLd";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://www.malirajvukovar.hr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bistro Mali Raj — Pizza, Burgeri i Roštilj u Vukovaru",
    template: "%s | Bistro Mali Raj",
  },
  description:
    "Obiteljski bistro u Vukovaru s domaćim burgerima, pizzom, roštiljem i dnevnim jelima. Dostava, catering za sve prigode i topla, obiteljska atmosfera.",
  keywords: [
    "restoran Vukovar",
    "burgeri Vukovar",
    "pizza Vukovar",
    "roštilj Vukovar",
    "catering Vukovar",
    "dostava hrane Vukovar",
    "Bistro Mali Raj",
  ],
  authors: [{ name: "Bistro Mali Raj" }],
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: siteUrl,
    siteName: "Bistro Mali Raj",
    title: "Bistro Mali Raj — Pizza, Burgeri i Roštilj u Vukovaru",
    description:
      "Obiteljski bistro u Vukovaru s domaćim burgerima, pizzom, roštiljem i dnevnim jelima. Dostava i catering za sve prigode.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bistro Mali Raj",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bistro Mali Raj — Pizza, Burgeri i Roštilj u Vukovaru",
    description:
      "Obiteljski bistro u Vukovaru s domaćim burgerima, pizzom, roštiljem i dnevnim jelima.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className="bg-bg font-body text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-ember-300 focus:px-4 focus:py-2 focus:text-white"
        >
          Preskoči na sadržaj
        </a>
        {children}
      </body>
    </html>
  );
}
