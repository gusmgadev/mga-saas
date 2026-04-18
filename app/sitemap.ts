import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/constants";

const BASE_URL = "https://mgainformatica.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceUrls = SERVICES.map((s) => ({
    url: `${BASE_URL}/servicios/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/clientes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...serviceUrls,
  ];
}
