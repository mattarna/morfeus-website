import { describe, expect, it } from "vitest";
import {
  buildBreadcrumbList,
  buildCourse,
  buildFaqPage,
  toPlainText,
} from "./builders";
import { ORGANIZATION_ID, SITE_URL } from "../entity-ids";

describe("toPlainText", () => {
  it("strips markdown emphasis", () => {
    expect(toPlainText("a **bold**, *italic* and `code`")).toBe(
      "a bold, italic and code"
    );
  });
  it("collapses whitespace", () => {
    expect(toPlainText("a   b\n c")).toBe("a b c");
  });
});

describe("buildFaqPage", () => {
  it("maps Q&A to Question/Answer nodes with cleaned text", () => {
    const schema = buildFaqPage([{ question: "Q?", answer: "**A**" }]);
    expect(schema["@type"]).toBe("FAQPage");
    const main = schema.mainEntity as unknown as Array<Record<string, unknown>>;
    expect(main).toHaveLength(1);
    expect(main[0]).toMatchObject({
      "@type": "Question",
      name: "Q?",
      acceptedAnswer: { "@type": "Answer", text: "A" },
    });
  });
});

describe("buildBreadcrumbList", () => {
  it("numbers positions and resolves absolute URLs", () => {
    const schema = buildBreadcrumbList([
      { name: "Home", path: "/it" },
      { name: "Case", path: "/it/case-study/sales" },
    ]);
    const list = schema.itemListElement as unknown as Array<
      Record<string, unknown>
    >;
    expect(list[0]).toMatchObject({
      position: 1,
      name: "Home",
      item: `${SITE_URL}/it`,
    });
    expect(list[1]).toMatchObject({
      position: 2,
      item: `${SITE_URL}/it/case-study/sales`,
    });
  });
});

describe("buildCourse", () => {
  it("links provider to the Organization @id", () => {
    const schema = buildCourse({ name: "AI Fundamentals", description: "x" });
    expect(schema["@type"]).toBe("Course");
    expect((schema.provider as Record<string, unknown>)["@id"]).toBe(
      ORGANIZATION_ID
    );
  });
});
