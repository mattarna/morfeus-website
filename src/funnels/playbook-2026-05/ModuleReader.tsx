"use client";

import { useEffect, useState } from "react";
import styles from "./sections.module.css";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const article = document.querySelector<HTMLElement>("[data-article-root]");
      if (!article) {
        setProgress(0);
        return;
      }
      const rect = article.getBoundingClientRect();
      const total = rect.height;
      const visible = window.innerHeight;
      const scrolled = -rect.top;
      if (total <= visible) {
        setProgress(scrolled <= 0 ? 0 : 100);
        return;
      }
      const ratio = scrolled / (total - visible);
      setProgress(Math.max(0, Math.min(1, ratio)) * 100);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={styles.readingProgress} aria-hidden>
      <div className={styles.readingProgressBar} style={{ width: `${progress}%` }} />
    </div>
  );
}

export function ActiveTocClient() {
  useEffect(() => {
    const article = document.querySelector<HTMLElement>("[data-article-root]");
    const tocLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]")
    );
    if (!article || tocLinks.length === 0) return;

    const linksByHash = new Map<string, HTMLAnchorElement>();
    tocLinks.forEach((link) => {
      const hash = link.getAttribute("href")?.replace(/^#/, "");
      if (hash) linksByHash.set(hash, link);
    });
    if (linksByHash.size === 0) return;

    const headings = Array.from(article.querySelectorAll<HTMLElement>("h2[id], h3[id]")).filter(
      (h) => linksByHash.has(h.id)
    );
    if (headings.length === 0) return;

    let lastActive = "";
    const setActive = (id: string) => {
      if (id === lastActive) return;
      lastActive = id;
      tocLinks.forEach((link) => link.removeAttribute("data-active"));
      linksByHash.get(id)?.setAttribute("data-active", "true");
    };

    const onScroll = () => {
      const offset = 120;
      let current = headings[0].id;
      for (const h of headings) {
        const top = h.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = h.id;
        } else {
          break;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
