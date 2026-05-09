"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import styles from "./sections.module.css";

export type DayFilterModule = {
  id: string;
  number: string;
  title: string;
  speaker: string;
  duration: string;
  color: string;
  focus: string;
  tags: readonly string[];
  day: 1 | 2;
};

interface DayFilterProps {
  modules: readonly DayFilterModule[];
  basePath: string;
}

export function DayFilter({ modules, basePath }: DayFilterProps) {
  const [day, setDay] = useState<1 | 2>(1);
  const counts = {
    1: modules.filter((m) => m.day === 1).length,
    2: modules.filter((m) => m.day === 2).length,
  };
  const filtered = modules.filter((m) => m.day === day);

  return (
    <>
      <div className={styles.daySwitchWrap}>
        <div className={styles.daySwitch} role="tablist" aria-label="Filtra per giornata">
          <button
            type="button"
            role="tab"
            aria-selected={day === 1}
            className={day === 1 ? styles.daySwitchActive : styles.daySwitchInactive}
            onClick={() => setDay(1)}
          >
            Giorno 1
            <span className={styles.daySwitchCount}>{counts[1]}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={day === 2}
            className={day === 2 ? styles.daySwitchActive : styles.daySwitchInactive}
            onClick={() => setDay(2)}
          >
            Giorno 2
            <span className={styles.daySwitchCount}>{counts[2] || "·"}</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.dayEmpty} role="tabpanel">
          <span className={styles.dayEmptyBadge}>Giorno 2</span>
          <h3>I materiali della seconda giornata arrivano presto.</h3>
          <p>
            Stiamo preparando i playbook degli speaker del Giorno 2. Lascia nome ed email
            qui sopra: te li mando appena sono pronti, insieme alla folder completa.
          </p>
        </div>
      ) : (
        <div className={styles.moduleGrid} role="tabpanel">
          {filtered.map((playbookModule) => (
            <Link
              className={styles.moduleCard}
              data-watermark={playbookModule.number}
              href={`${basePath}/${playbookModule.id}`}
              key={playbookModule.id}
              style={{ "--speaker": playbookModule.color } as CSSProperties}
            >
              <span className={styles.moduleSpeakerPill}>{playbookModule.speaker}</span>
              <p className={styles.moduleNumber}>
                Modulo {playbookModule.number} · {playbookModule.duration}
              </p>
              <h3>{playbookModule.title}</h3>
              <p>{playbookModule.focus}</p>
              <div className={styles.moduleCardFooter}>
                <div className={styles.tagRow}>
                  {playbookModule.tags.map((tag) => (
                    <span className={styles.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={styles.moduleCardArrow} aria-hidden>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
