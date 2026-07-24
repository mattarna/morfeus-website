import type { Metadata } from "next";

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
  return <div>{children}</div>;
}
