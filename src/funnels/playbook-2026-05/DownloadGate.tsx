"use client";

import { useState } from "react";
import styles from "./sections.module.css";

type SubmitState = "idle" | "loading" | "success" | "error";

function readUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
  };
}

export function PlaybookDownloadGate() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/funnels/playbook/optin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: "Playbook_infobusiness_milionario",
          ...readUtmParams(),
        }),
      });

      if (!response.ok) {
        setState("error");
        setMessage("Controlla nome ed email, poi riprova.");
        return;
      }

      setState("success");
      setMessage("Perfetto. Download sbloccato.");
    } catch {
      setState("error");
      setMessage("Qualcosa non ha risposto. Riprova tra un momento.");
    }
  }

  return (
    <div className={styles.downloadPanel} id="download">
      <div>
        <p className={styles.kicker}>Download completo</p>
        <h2>Portati via tutto il materiale.</h2>
        <p>
          Lascia nome ed email e sblocchi il pacchetto con hub, moduli, template
          e materiali sorgente del playbook.
        </p>
      </div>

      {state === "success" ? (
        <div className={styles.downloadSuccess}>
          <p>{message}</p>
          <a className={styles.primaryButton} href="/api/funnels/playbook/download">
            Scarica il pacchetto ZIP
          </a>
        </div>
      ) : (
        <form className={styles.downloadForm} onSubmit={onSubmit}>
          <label>
            Nome
            <input name="name" required autoComplete="name" placeholder="Il tuo nome" />
          </label>
          <label>
            Email
            <input name="email" required type="email" autoComplete="email" placeholder="nome@email.com" />
          </label>
          <button className={styles.primaryButton} type="submit" disabled={state === "loading"}>
            {state === "loading" ? "Invio in corso..." : "Sblocca download"}
          </button>
          {message ? <p className={styles.formMessage}>{message}</p> : null}
        </form>
      )}
    </div>
  );
}
