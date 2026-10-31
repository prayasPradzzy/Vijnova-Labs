import type { Metadata } from "next";
import { Newsreader, Geist } from "next/font/google";
import "./globals.css";

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = "https://vijnova.com";
const title = "Vijnova Labs | Designing the next generation of organisational intelligence.";
const description =
  "Vijnova Labs builds evidence-based AI software for knowledge work. Our first product, Margastra, helps career counsellors combine psychometric assessment, AI-assisted interviews, and evidence-based reporting into one workflow.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Vijnova Labs",
  },
  description,
  keywords: [
    "Vijnova Labs",
    "Margastra",
    "AI career counselling software",
    "career counsellor tools",
    "psychometric assessment platform",
    "evidence-based AI software",
    "organisational intelligence",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Vijnova Labs",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vijnova Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vijnova Labs",
  url: siteUrl,
  description,
  sameAs: ["https://linkedin.com/company/vijnovalabs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} dark antialiased h-full`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-ember/30">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
