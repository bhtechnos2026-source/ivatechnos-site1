import type { Metadata } from "next";
import "./globals.css";
import "reactflow/dist/style.css";

export const metadata: Metadata = {
  title: "EnterpriseCore — Company Intelligence",
  description:
    "AI Chief of Staff for CEOs. Company, tender, and event intelligence with AI-generated recommendations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
