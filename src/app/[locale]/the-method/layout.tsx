import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Method — Morfeus Operating Standard",
  description:
    "How we work at Morfeus. The standard we train, hire, and pay against: define done, ask better questions, own the outcome.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TheMethodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={jetbrains.variable}>{children}</div>;
}
