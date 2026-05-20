import { getProfile } from "@/lib/portfolio-data";
import { SITE_URL } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/**
 * schema.org JSON-LD for the portfolio: a `Person` (the primary entity) and a
 * `WebSite` that points back to it.
 *
 * The `Person` carries the full legal name plus aliases (`alternateName`,
 * `givenName`/`additionalName`/`familyName`) so search engines resolve every
 * variant — "Carlos Mesquita", "Carlos Emanuel Soares de Mesquita", "carlos3g"
 * — to a single entity. `sameAs` corroborates that entity against external
 * profiles. Localized so jobTitle/description/inLanguage match the locale.
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
        alternateName: ["Carlos Emanuel Soares de Mesquita", profile.handle],
        givenName: "Carlos Emanuel",
        additionalName: "Soares",
        familyName: "Mesquita",
        url: SITE_URL,
        mainEntityOfPage: SITE_URL,
        jobTitle: profile.title,
        description: profile.summary,
        email: profile.email,
        image: `${SITE_URL}/apple-icon`,
        knowsLanguage: ["pt-BR", "en"],
        nationality: {
          "@type": "Country",
          name: locale === "pt" ? "Brasil" : "Brazil",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Instituto Federal do Piauí",
        },
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
        alternateName: "Carlos Emanuel Soares de Mesquita",
        description: profile.tagline,
        inLanguage: locale === "pt" ? "pt-BR" : "en-US",
        about: { "@id": `${SITE_URL}/#person` },
        author: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}
