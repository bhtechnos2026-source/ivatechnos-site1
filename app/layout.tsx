import type { Metadata } from "next";
import "./globals.css";
import "reactflow/dist/style.css";

export const metadata: Metadata = {
  title: "IVA Technos Lynk — Powered by BlueLynk",
  description:
    "Company intelligence dashboards for Bicelli Geco and IVA Technos — AI-generated recommendations on tenders, events, and business opportunities, powered by BlueLynk.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
