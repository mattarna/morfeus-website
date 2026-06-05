import { describe, expect, it } from "vitest";
import { FUNNEL_COMPONENT_NAMES, isFunnelComponentName } from "./component-contract";

describe("funnel component contract", () => {
  it("recognizes known components", () => {
    expect(isFunnelComponentName("WebinarHero")).toBe(true);
    expect(isFunnelComponentName("PlaybookQr")).toBe(true);
  });

  it("rejects unknown components", () => {
    expect(isFunnelComponentName("UnknownComponent")).toBe(false);
  });

  it("keeps component names unique", () => {
    const unique = new Set(FUNNEL_COMPONENT_NAMES);
    expect(unique.size).toBe(FUNNEL_COMPONENT_NAMES.length);
  });
});
