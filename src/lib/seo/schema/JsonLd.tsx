import type { Thing, WithContext } from "schema-dts";

/**
 * Renders one or more JSON-LD <script> blocks.
 *
 * Works in both Server and Client Components: in the App Router a Client
 * Component is still server-rendered for the initial HTML, so the structured
 * data lands in the SSR output where non-JS crawlers (GPTBot, ClaudeBot,
 * PerplexityBot, Googlebot…) can read it without executing JavaScript.
 */
export function JsonLd<T extends Thing>({
  schema,
}: {
  schema: WithContext<T> | WithContext<T>[];
}) {
  const items = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}
    </>
  );
}

/** JSON-LD serialization that neutralizes "</script>" breakouts in text fields. */
function serializeJsonLd<T extends Thing>(schema: WithContext<T>): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
