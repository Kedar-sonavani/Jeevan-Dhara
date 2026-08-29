import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jeevan Dhara Sansthan | Rural Development & Women's Empowerment NGO",
    template: "%s | Jeevan Dhara Sansthan",
  },
  description:
    "Registered NGO in Bikaner, Rajasthan dedicated to women's empowerment, digital literacy, sustainable livelihoods, biogas clean energy, and traditional Charkha handloom revival. 12AA & 80G tax exempt.",
  keywords: [
    "NGO Bikaner",
    "Women Empowerment Rajasthan",
    "Rural Development NGO",
    "Charkha Handloom Revival",
    "80G Tax Exemption Donation",
    "CSR Partnerships India",
    "Biogas Energy Rural",
    "Jeevan Dhara Sansthan",
  ],
  authors: [{ name: "Jeevan Dhara Sansthan" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jeevandhara.org",
    title: "Jeevan Dhara Sansthan | Empowering Rural Rajasthan",
    description:
      "Empowering women through self-employment, digital literacy, and sustainable rural development in Rajasthan.",
    siteName: "Jeevan Dhara Sansthan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Jeevan Dhara Sansthan",
    url: "https://jeevandhara.org",
    logo: "https://jeevandhara.org/images/logo.png",
    foundingDate: "2012-08-01",
    founders: [
      {
        "@type": "Person",
        name: "Mahaveer Upadhyay",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kolasar Mandi, Tehsil Sri Dungargarh",
      addressLocality: "Bikaner",
      addressRegion: "Rajasthan",
      postalCode: "334001",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-94144-86377",
      contactType: "Customer Support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    nonprofitStatus: "Nonprofit501c3",
    taxID: "12AA & 80G(5) Certified",
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-cream text-dark antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
