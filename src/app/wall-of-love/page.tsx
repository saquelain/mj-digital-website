import type { Metadata } from 'next';
import WallOfLoveClient from '@/components/wall-of-love/WallOfLoveClient';

export const metadata: Metadata = {
  title: "Wall of Love | MJ Digital Services",
  description: "Real feedback from the businesses we've built for — fintech APIs, platforms, and products shipped by MJ Digital Services.",
  alternates: {
    canonical: "https://www.mjdigitalservices.com/wall-of-love",
  },
  openGraph: {
    title: "Wall of Love | MJ Digital Services",
    description: "Real feedback from the businesses we've built for.",
    url: "https://www.mjdigitalservices.com/wall-of-love",
    siteName: "MJ Digital Services",
    type: "website",
    images: [{ url: "https://www.mjdigitalservices.com/og-image.png", width: 1200, height: 630, alt: "MJ Digital Services Wall of Love" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wall of Love | MJ Digital Services",
    description: "Real feedback from the businesses we've built for.",
    images: ["https://www.mjdigitalservices.com/og-image.png"],
  },
};

export default function WallOfLovePage() {
  return <WallOfLoveClient />;
}