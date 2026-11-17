import { projects } from "@/lib/projects";
import {
  absoluteUrl,
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_IMAGE,
  socialProfiles,
} from "@/lib/site";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROFILE_PAGE_ID = `${SITE_URL}/#profile`;
const PROJECTS_ID = `${SITE_URL}/#projects`;

// Only facts already shown on the site (hero, about, journey, footer, work).
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: absoluteUrl("/"),
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": PROFILE_PAGE_ID,
        url: absoluteUrl("/"),
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        primaryImageOfPage: absoluteUrl(SOCIAL_IMAGE.url),
        hasPart: { "@id": PROJECTS_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        givenName: "Jurgen",
        familyName: "Leka",
        url: absoluteUrl("/"),
        email: `mailto:${CONTACT_EMAIL}`,
        jobTitle: "Software Engineer",
        description:
          "Software engineer who has spent six years shipping web apps, mobile apps and developer tools with teams across Europe and the US, mostly in React, Next.js, Angular and Node.js.",
        worksFor: { "@type": "Organization", name: "Moveo" },
        hasOccupation: {
          "@type": "Occupation",
          name: "Lead Frontend Developer",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Canadian Institute of Technology",
        },
        knowsAbout: [
          "React",
          "Next.js",
          "Angular",
          "Node.js",
          "TypeScript",
          "Ionic",
          "Swift",
          "SwiftUI",
          "Ruby on Rails",
          "Python",
          "Rust",
          "Frontend architecture",
          "Developer tools",
        ],
        sameAs: socialProfiles.map((profile) => profile.href),
        subjectOf: { "@type": "DigitalDocument", name: "Résumé", url: absoluteUrl("/resume.pdf") },
      },
      {
        "@type": "ItemList",
        "@id": PROJECTS_ID,
        name: "Selected work by Jurgen Leka",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: project.name,
            description: project.description,
            url: project.url,
            codeRepository: project.sourceUrl ?? project.url,
            genre: project.eyebrow,
            keywords: project.tags.join(", "),
            author: { "@id": PERSON_ID },
            creator: { "@id": PERSON_ID },
          },
        })),
      },
    ],
  };
}
