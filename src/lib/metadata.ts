import type { Metadata } from "next";
import { SITE_NAME, SOCIAL_IMAGE, TWITTER_HANDLE } from "@/lib/site";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  socialDescription?: string;
  // Use the title as-is instead of the "%s | Jurgen Leka" template.
  absoluteTitle?: boolean;
};

// Next shallow-merges metadata, so a page that sets openGraph or twitter
// replaces the root layout's objects. Build complete ones for every page.
export function pageMetadata({
  title,
  description,
  path,
  socialDescription = description,
  absoluteTitle = false,
}: PageMetadata): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url: path,
      title: socialTitle,
      description: socialDescription,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: socialTitle,
      description: socialDescription,
      images: [{ url: SOCIAL_IMAGE.url, alt: SOCIAL_IMAGE.alt }],
    },
  };
}
