/**
 * Mockup layout: no header, no footer, no site chrome.
 * For design review of opt-in page variants.
 * Wrapper garantisce sfondo scuro di fallback (evita bianco da body/globals).
 */
export default function MockupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#0a0a0c" }}
    >
      {children}
    </div>
  );
}
