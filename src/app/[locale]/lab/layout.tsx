import { SmoothScrollProvider } from "@/components/shared/SmoothScroll";

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
