import { describe, expect, it } from "vitest";
import { buildLocaleAlternates, getIndexableLocalizedEntries } from "./public-indexing";

describe("public indexing helpers", () => {
  it("builds canonical and language alternates for a locale route", () => {
    const alternates = buildLocaleAlternates("forge", "it");

    expect(alternates.canonical).toBe("/it/forge");
    expect(alternates.languages.en).toBe("/en/forge");
    expect(alternates.languages.it).toBe("/it/forge");
    expect(alternates.languages["x-default"]).toBe("/en/forge");
  });

  it("includes both locales in indexable entries", () => {
    const entries = getIndexableLocalizedEntries("https://morfeushub.com");

    expect(entries.some((entry) => entry.url === "https://morfeushub.com/it")).toBe(true);
    expect(entries.some((entry) => entry.url === "https://morfeushub.com/en")).toBe(true);
  });
});
