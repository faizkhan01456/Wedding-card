import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayesha & Rayyan — A Celebration of Love",
  description: "Join Ayesha and Rayyan as they begin their forever. A thoughtfully designed digital wedding invitation.",
  openGraph: {
    title: "Ayesha & Rayyan — A Celebration of Love",
    description: "With the blessings of our families, we invite you to celebrate with us.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}