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
  title: "PawLuxury | Premium Pet Ecommerce & Veterinary Care",
  description: "Experience national-level luxury pet shopping and professional veterinary consultation. Premium food, accessories, and digital veterinary care for your beloved companion.",
  keywords: "luxury pet store, premium dog food, vet consultation online, designer cat accessories, PawLuxury, premium pet ecosystem",
  openGraph: {
    title: "PawLuxury | Premium Pet Ecommerce & Veterinary Care",
    description: "Experience national-level luxury pet shopping and professional veterinary consultation.",
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


