import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Every URL in the language set carries the full hreflang map (including a
  // self-reference and x-default), mirroring the HTML <link rel="alternate">.
  const languages = {
    pt: SITE_URL,
    en: `${SITE_URL}/en`,
    "x-default": SITE_URL,
  };

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
  ];
}
