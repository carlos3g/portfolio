import { getProfile } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/**
 * schema.org JSON-LD for the portfolio: a `Person` (the primary entity, with
 * `sameAs` social profiles for Knowledge Graph reconciliation) and a `WebSite`
 * that points back to it. Localized so `jobTitle`/`description`/`inLanguage`
 * match the rendered locale.
 */
export function getStructuredData(locale: Locale) {
  const profile = getProfile(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        url: SITE_URL,
        jobTitle: profile.title,
        description: profile.summary,
        email: profile.email,
        image: `${SITE_URL}/apple-icon`,
        sameAs: [profile.github, profile.linkedin],
        knowsAbout: [
          "TypeScript",
          "JavaScript",
          "Node.js",
          "React",
          "React Native",
          "Next.js",
          "PHP",
          "Laravel",
          "AWS",
          "PostgreSQL",
          "CI/CD",
          "Software Architecture",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          addressCountry: "BR",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: profile.name,
        description: profile.tagline,
        inLanguage: locale === "pt" ? "pt-BR" : "en-US",
        about: { "@id": `${SITE_URL}/#person` },
        author: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}
