import type { Metadata } from "next";
import { GecoDashboard } from "@/components/GecoDashboard";

export const metadata: Metadata = {
  title: "GecoLynk — Powered by BlueHiveTechnos",
};

export default function Page() {
  return <GecoDashboard />;
}
