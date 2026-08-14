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
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-dark antialiased">
        {children}
      </body>
    </html>
  );
}
