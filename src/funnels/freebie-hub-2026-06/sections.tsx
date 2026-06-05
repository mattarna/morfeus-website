"use client";

import Image from "next/image";
import Link from "next/link";
import type { FreebieHubContent, FreebieHubResource, FunnelStepConfig } from "@/funnels/types";

interface SectionProps {
  accentColor: string;
  step: FunnelStepConfig;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 16px",
        borderRadius: 100,
        background: "rgba(235,122,46,0.10)",
        border: "1px solid rgba(235,122,46,0.25)",
        color: "var(--orange)",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        fontFamily: "var(--font-body)",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--orange)",
          boxShadow: "0 0 8px rgba(235,122,46,0.6)",
          animation: "badge-pulse 2s infinite",
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}

function renderHeadlineWithAccent(headline: string, accent?: string): React.ReactNode {
  if (!accent) return headline;
  const idx = headline.indexOf(accent);
  if (idx === -1) return headline;
  return (
    <>
      {headline.slice(0, idx)}
      <span
        style={{
          fontFamily: "var(--font-italic)",
          fontStyle: "italic",
          fontWeight: 500,
          color: "var(--orange)",
        }}
      >
        {accent}
      </span>
      {headline.slice(idx + accent.length)}
    </>
  );
}

function ResourceCover({ resource }: { resource: FreebieHubResource }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "linear-gradient(135deg, rgba(235,122,46,0.25), rgba(123,104,238,0.18))",
        flexShrink: 0,
      }}
    >
      {resource.coverSrc ? (
        <Image
          src={resource.coverSrc}
          alt={resource.title}
          fill
          sizes="(max-width: 768px) 100vw, 520px"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            fontSize: 48,
          }}
        >
          {resource.icon ?? "🎁"}
        </span>
      )}
    </div>
  );
}

function ResourceCard({ resource }: { resource: FreebieHubResource }) {
  return (
    <Link
      href={resource.href}
      style={{
        display: "flex",
        flexDirection: resource.featured ? "row" : "column",
        gap: resource.featured ? 28 : 18,
        gridColumn: resource.featured ? "1 / -1" : "auto",
        background: resource.featured
          ? "linear-gradient(135deg, rgba(235,122,46,0.10), rgba(123,104,238,0.06))"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${resource.featured ? "rgba(235,122,46,0.25)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 18,
        padding: resource.featured ? 24 : 20,
        textDecoration: "none",
        color: "inherit",
        transition: "transform .2s, box-shadow .2s, border-color .2s, background .2s",
        alignItems: resource.featured ? "center" : "stretch",
      }}
      className={resource.featured ? "freebie-hub-card freebie-hub-card--featured" : "freebie-hub-card"}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = "rgba(235,122,46,0.40)";
        e.currentTarget.style.boxShadow = "0 16px 44px rgba(0,0,0,0.40)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = resource.featured
          ? "rgba(235,122,46,0.25)"
          : "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          flex: resource.featured ? "0 0 46%" : "none",
          width: resource.featured ? "46%" : "100%",
        }}
        className={resource.featured ? "freebie-hub-cover--featured" : undefined}
      >
        <ResourceCover resource={resource} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <span
          style={{
            alignSelf: "flex-start",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--orange)",
            fontWeight: 700,
            fontFamily: "var(--font-body)",
            padding: "5px 12px",
            borderRadius: 100,
            background: "rgba(235,122,46,0.10)",
            border: "1px solid rgba(235,122,46,0.22)",
          }}
        >
          {resource.badge}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: resource.featured ? "clamp(24px, 3vw, 30px)" : 21,
            lineHeight: 1.2,
            color: "var(--white)",
            margin: 0,
            fontWeight: 600,
          }}
        >
          {resource.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: resource.featured ? 16 : 15,
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: 0,
          }}
        >
          {resource.body}
        </p>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 700,
            color: "var(--orange)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: "auto",
          }}
        >
          {resource.ctaLabel} <span style={{ fontSize: 16 }}>→</span>
        </span>
      </div>
    </Link>
  );
}

export function FreebieHubSection({ step }: SectionProps) {
  const content = step.content.FreebieHub as FreebieHubContent;

  return (
    <section
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "40px 24px 80px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720, marginBottom: 44 }}>
        <Badge>{content.badge}</Badge>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 5vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--white)",
            margin: 0,
            fontWeight: 600,
          }}
        >
          {renderHeadlineWithAccent(content.headline, content.headlineAccent)}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 18,
            lineHeight: 1.55,
            color: "var(--ghost)",
            opacity: 0.85,
            margin: 0,
          }}
        >
          {content.subheadline}
        </p>
      </div>

      {/* Grid */}
      <div
        className="freebie-hub-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 20,
        }}
      >
        {content.resources.map((resource) => (
          <ResourceCard key={resource.href} resource={resource} />
        ))}
      </div>

      {content.footnote && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--muted)",
            opacity: 0.8,
            marginTop: 36,
            textAlign: "center",
          }}
        >
          {content.footnote}
        </p>
      )}

      <style>{`
        @media (min-width: 760px) {
          .freebie-hub-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .freebie-hub-card--featured {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .freebie-hub-cover--featured {
            width: 100% !important;
            flex: none !important;
          }
        }
      `}</style>
    </section>
  );
}
