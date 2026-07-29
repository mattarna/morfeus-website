"use client";

/**
 * InsightsBrowser — client-side filter + full-text search per l'hub Insights.
 * Riceve la lista articoli pre-serializzata dal server e filtra in memoria.
 * Filtri: chip categoria + input testo (matching su title/tldr/tags/category).
 * Card renderizzata qui per aggiornare istantaneamente al filtro.
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import { InsightCover, type CoverKind, coverKindFromCategory } from "./InsightCover";

export type BrowserArticle = {
  slug: string;
  title: string;
  tldr: string;
  metaDescription: string;
  category: string;
  tags: string[];
  datePublished: string;
  readingTime: string;
  coverKind: string;
};

type UiCopy = {
  h2a: string;
  h2emph: string;
  h2b: string;
  readMore: string;
  searchPlaceholder: string;
  allLabel: string;
  emptyState: string;
};

function formatDateIt(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const months = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function InsightsBrowser({
  articles,
  categories,
  locale,
  ui,
}: {
  articles: BrowserArticle[];
  categories: string[];
  locale: "it" | "en";
  ui: UiCopy;
}) {
  const [activeCat, setActiveCat] = useState<string>("__ALL__");
  const [query, setQuery] = useState<string>("");
  const base = `/${locale}`;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (activeCat !== "__ALL__" && a.category !== activeCat) return false;
      if (!q) return true;
      const haystack = [
        a.title,
        a.tldr,
        a.metaDescription,
        a.category,
        ...a.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [articles, activeCat, query]);

  return (
    <>
      {/* Toolbar filtri (sopra la griglia): chip categoria + search. */}
      <div
        className="mt-[34px] flex flex-wrap items-center justify-between gap-[18px] border-b pb-[18px]"
        style={{ borderColor: "rgba(11,11,12,.14)" }}
      >
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => setActiveCat("__ALL__")}
            className="min-h-[44px] rounded-full border px-3.5 py-2 font-plex text-[13px] font-semibold tracking-[.06em] transition-colors"
            style={
              activeCat === "__ALL__"
                ? { background: "#533DFC", borderColor: "#533DFC", color: "#fff" }
                : { borderColor: "rgba(11,11,12,.18)", color: "#3A3B45", background: "transparent" }
            }
          >
            {ui.allLabel}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCat(c)}
              className="min-h-[44px] rounded-full border px-3.5 py-2 font-plex text-[13px] font-semibold tracking-[.06em] transition-colors"
              style={
                activeCat === c
                  ? { background: "#533DFC", borderColor: "#533DFC", color: "#fff" }
                  : { borderColor: "rgba(11,11,12,.18)", color: "#3A3B45", background: "transparent" }
              }
            >
              {c}
            </button>
          ))}
        </div>
        <div
          className="flex min-h-[44px] min-w-[240px] items-center gap-2 rounded-full border px-3.5 py-2"
          style={{ borderColor: "rgba(11,11,12,.18)", background: "rgba(11,11,12,.02)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7E8091" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={ui.searchPlaceholder}
            /* 16px NON e' una scelta estetica: sotto i 16px iOS Safari
             zooma la pagina da solo quando tocchi dentro il campo, e
             non torna indietro da solo. Era 14px. */
          className="min-w-[180px] flex-1 border-0 bg-transparent font-satoshi text-[16px] outline-none"
            style={{ color: "#0B0B0C" }}
            aria-label={ui.searchPlaceholder}
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Reset"
              className="grid h-[32px] w-[32px] place-items-center font-plex text-[13px] text-ombra hover:text-firma"
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>

      {/* H2 sezione */}
      <h2 className="h-sect mt-[56px]">
        {ui.h2a}
        <span className="emph">{ui.h2emph}</span>
        {ui.h2b}
      </h2>

      {/* Griglia risultati */}
      {filtered.length === 0 ? (
        <p className="mt-[30px] font-satoshi text-[16px]" style={{ color: "#3A3B45" }}>
          {ui.emptyState}
        </p>
      ) : (
        <div className="mt-[30px] grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => {
            const kind: CoverKind = (a.coverKind as CoverKind) || coverKindFromCategory(a.category);
            return (
              <Link
                key={a.slug}
                href={`${base}/insights/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-[12px] border transition-colors hover:border-firma/50"
                style={{
                  borderColor: "rgba(11,11,12,.14)",
                  background: "rgba(11,11,12,.015)",
                }}
              >
                <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                  <InsightCover kind={kind} variant="carta" category={a.category} />
                </div>
                <div className="flex flex-1 flex-col p-[22px]">
                  <div className="flex flex-wrap items-center gap-2">
                    {a.tags.slice(0, 2).map((t, i) => (
                      <span
                        key={i}
                        className="rounded-full border px-2.5 py-[5px] font-plex text-[13px] font-semibold uppercase tracking-[.04em] text-firma"
                        style={{
                          background: "rgba(83,61,252,.07)",
                          borderColor: "rgba(83,61,252,.22)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-2 font-plex text-[13px] tracking-[.06em] text-ombra">
                    {formatDateIt(a.datePublished)} · {a.readingTime}
                  </span>
                  <h3 className="my-[6px] text-[20px] font-semibold" style={{ color: "#0B0B0C" }}>
                    {a.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[14.5px]" style={{ color: "#3A3B45" }}>
                    {a.tldr || a.metaDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-plex text-[13px] font-semibold tracking-[.04em] text-firma">
                    {ui.readMore} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
