import type { Metadata } from "next";
import "./globals.css";
import "reactflow/dist/style.css";

export const metadata: Metadata = {
  title: "IVA Technos — EnterpriseCore Intelligence",
  description:
    "Company intelligence dashboard for IVA Technos. AI-generated recommendations on tenders, events, and business opportunities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
