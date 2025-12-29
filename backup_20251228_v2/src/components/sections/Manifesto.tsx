"use client";

/**
 * Manifesto Section - Index 1 (Vision)
 * 
 * Full viewport height with centered text
 * Gradient text effect on the manifesto statement
 */
export function Manifesto() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-2xl md:text-4xl leading-snug font-normal text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 tracking-tight">
          Morfeus exists to transform how organizations integrate artificial intelligence into everyday work. We believe AI should not be a tool you use but a capability embedded into the DNA of the organization.
        </p>
      </div>
    </section>
  );
}
