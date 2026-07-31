import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  buildLocaleAlternates,
  buildLocalizedPath,
  getIndexableLocalizedEntries,
  localePrefix,
} from "./public-indexing";
import { routing } from "../../i18n/routing";

describe("public indexing helpers", () => {
  /* Il guardiano vero: se qualcuno cambia default o strategia di
     prefisso in routing.ts, questi helper generano indirizzi che
     redirigono e nessuno se ne accorge finche' non cala il traffico. */
  it("stays aligned with the i18n routing config", () => {
    expect(DEFAULT_LOCALE).toBe(routing.defaultLocale);
    expect(routing.localePrefix).toBe("as-needed");
  });

  it("omits the prefix for the default locale and keeps it for the others", () => {
    expect(localePrefix("en")).toBe("");
    expect(localePrefix("it")).toBe("/it");
    expect(buildLocalizedPath("en", "lab")).toBe("/lab");
    expect(buildLocalizedPath("it", "lab")).toBe("/it/lab");
    expect(buildLocalizedPath("en", "")).toBe("/");
    expect(buildLocalizedPath("it", "")).toBe("/it");
  });

  it("builds canonical and language alternates for a locale route", () => {
    const alternates = buildLocaleAlternates("forge", "it");

    expect(alternates.canonical).toBe("/it/forge");
    expect(alternates.languages.en).toBe("/forge");
    expect(alternates.languages.it).toBe("/it/forge");
    expect(alternates.languages["x-default"]).toBe("/forge");
  });

  it("builds canonical without prefix for the english route", () => {
    const alternates = buildLocaleAlternates("forge", "en");

    expect(alternates.canonical).toBe("/forge");
  });

  it("includes both locales in indexable entries", () => {
    const entries = getIndexableLocalizedEntries("https://www.morfeushub.com");

    expect(entries.some((entry) => entry.url === "https://www.morfeushub.com/it")).toBe(true);
    expect(entries.some((entry) => entry.url === "https://www.morfeushub.com/")).toBe(true);
  });
});
