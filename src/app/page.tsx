import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Industries from "@/components/home/Industries";
import TechStack from "@/components/home/TechStack";
import Testimonials from "@/components/home/Testimonials";
import FAQs from "@/components/home/FAQs";
import CTABanner from "@/components/home/CTABanner";
import ProductShowcase from "@/components/home/ProductShowcase";
import PartnersField from "@/components/home/PartnersField";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MJ Digital Services",
  url: "https://www.mjdigitalservices.com",
  logo: "https://www.mjdigitalservices.com/og-image.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "business@mjdigitalservices.com",
    contactType: "customer support",
  },
  sameAs: [],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does MJ Digital Services offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a full spectrum of technology services including fintech API integration, CPaaS solutions (WhatsApp, SMS, RCS), web and mobile app development, AI chatbots, white label fintech platforms, CRM/ERP development, and cloud & DevOps infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to integrate your fintech APIs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most of our fintech APIs — including AEPS, DMT, BBPS, KYC, and PAN verification — can be integrated within 2 to 5 business days. We provide comprehensive documentation, a sandbox environment for testing, and dedicated technical support.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer white label solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our white label fintech platform lets you launch your own branded merchant portal, digital wallet, or payment aggregation platform in as little as 2 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "Who is MJ Digital Services and what makes you different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MJ Digital Services is a technology company building fintech infrastructure, communication platforms, and custom software for businesses across India. What sets us apart is our combination of deep fintech and regulatory expertise with full-stack development capability.",
      },
    },
    {
      "@type": "Question",
      name: "Can you build a custom mobile app for my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We build native and cross-platform mobile apps for Android and iOS using Flutter and React Native. Our team handles everything from design and development to QA, deployment, and ongoing maintenance.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of support do you provide after delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide dedicated post-delivery support including bug fixes, performance monitoring, feature updates, and 24/7 infrastructure monitoring. Every client gets a dedicated account manager with guaranteed response times under 2 hours.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started with MJ Digital Services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply reach out to us at business@mjdigitalservices.com or click the 'Let's Talk' button on our website. We'll schedule a discovery call to understand your requirements and share a detailed project plan.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with government organizations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We have experience building compliance-ready solutions for government-focused organizations. Our platforms support Aadhaar-based KYC, government API integrations, and data security standards required for public sector projects.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MJ Digital Services",
  url: "https://www.mjdigitalservices.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.mjdigitalservices.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main>
        <Hero />
        <TrustedBy />
        <ProductShowcase />
        <Services />
        <WhyChooseUs />
        <PartnersField />
        <Testimonials />
        <Industries />
        <TechStack />
        <FAQs />
        <CTABanner />
      </main>
    </>
  );
}