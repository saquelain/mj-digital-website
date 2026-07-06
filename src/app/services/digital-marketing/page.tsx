import "./digital-marketing.css";
import type { Metadata } from "next";
import DigitalMarketingHero from "@/components/services/digital-marketing/DigitalMarketingHero";
import DigitalMarketingCategories from "@/components/services/digital-marketing/DigitalMarketingCategories";
import DigitalMarketingUseCases from "@/components/services/digital-marketing/DigitalMarketingUseCases";
import DigitalMarketingProcess from "@/components/services/digital-marketing/DigitalMarketingProcess";
import DigitalMarketingCTA from "@/components/services/digital-marketing/DigitalMarketingCTA";

export const metadata: Metadata = {
  title: "Digital Marketing Services — SEO, SMO, Performance Marketing | MJ Digital Services",
  description: "Full-stack digital marketing — SEO, social media optimization, performance marketing, and digital consulting. Drive traffic, engagement, and conversions that compound.",
  keywords: ["digital marketing agency India", "SEO services", "SMO services", "performance marketing", "digital consulting", "PPC management India", "MJ Digital marketing"],
  openGraph: {
    title: "Digital Marketing Services — SEO, SMO, Performance Marketing | MJ Digital Services",
    description: "Full-stack digital marketing — SEO, social media, paid campaigns, and strategy that drives real growth.",
    url: "https://www.mjdigitalservices.com/services/digital-marketing",
    siteName: "MJ Digital Services",
    images: [{ url: "https://www.mjdigitalservices.com/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services | MJ Digital Services",
    description: "SEO, SMO, performance marketing, and digital consulting under one roof.",
    images: ["https://www.mjdigitalservices.com/og-image.png"],
  },
  alternates: {
    canonical: "https://www.mjdigitalservices.com/services/digital-marketing",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing Services",
  description: "SEO, social media optimization, performance marketing, and digital consulting services.",
  provider: {
    "@type": "Organization",
    name: "MJ Digital Services",
    url: "https://www.mjdigitalservices.com",
  },
  areaServed: "IN",
  serviceType: "Digital Marketing",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <DigitalMarketingHero />
      <DigitalMarketingCategories />
      <DigitalMarketingUseCases />
      <DigitalMarketingProcess />
      <DigitalMarketingCTA />
    </>
  );
}