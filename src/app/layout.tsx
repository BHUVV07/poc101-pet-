import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import GlobalLayoutWrapper from "../components/common/GlobalLayoutWrapper";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manasa Vet Pharma | Specialty Veterinary Care & Supplies",
  description: "Specialty veterinary pharmacy, B2B medicines distribution, and professional clinical care hospital. Integrated pet health and apothecary ecosystem in Shivamogga, Karnataka.",
  keywords: "veterinary pharmacy, vet medicines, B2B vet supply, animal clinic, Buddy Kitty hospital, Manasa Vet Pharma, Shivamogga",
  openGraph: {
    title: "Manasa Vet Pharma | Specialty Veterinary Care & Supplies",
    description: "Specialty veterinary pharmacy, B2B medicines distribution, and professional clinical care hospital.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-text-dark">
        <GlobalLayoutWrapper>{children}</GlobalLayoutWrapper>
      </body>
    </html>
  );
}


