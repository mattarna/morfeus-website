import { SmoothScrollProvider } from "@/components/shared/SmoothScroll";

export default function OperatingSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
