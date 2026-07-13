import type { MetadataRoute } from "next";

const siteUrl = "https://www.malirajvukovar.hr";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/menu",
    "/weekly-menu",
    "/catering",
    "/gallery",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/weekly-menu" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
