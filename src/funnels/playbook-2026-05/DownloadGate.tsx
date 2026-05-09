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

function usePlaybookOptin() {
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
          source: "Playbook_imprenditore_milionario",
          ...readUtmParams(),
        }),
      });

      if (!response.ok) {
        setState("error");
        setMessage("Controlla nome ed email, poi riprova.");
        return;
      }

      setState("success");
      setMessage("Perfetto. Ti porto alla pagina di conferma.");
      window.location.href = "/playbook-imprenditore-milionario/thank-you";
    } catch {
      setState("error");
      setMessage("Qualcosa non ha risposto. Riprova tra un momento.");
    }
  }

  return { state, message, onSubmit };
}

export function PlaybookOptinForm() {
  const { state, message, onSubmit } = usePlaybookOptin();

  if (state === "success") {
    return (
      <div className={styles.downloadSuccess}>
        <p>{message}</p>
      </div>
    );
  }

  return (
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
        {state === "loading" ? "Invio in corso..." : "Mandami la folder"}
      </button>
      {message ? <p className={styles.formMessage}>{message}</p> : null}
    </form>
  );
}

export function PlaybookDownloadGate() {
  return (
    <div className={styles.downloadPanel} id="download">
      <div>
        <p className={styles.kicker}>Folder in arrivo</p>
        <h2>Vuoi ricevere il cervello pronto per Claude?</h2>
        <p>
          Lascia nome ed email. Lunedi metto insieme la folder completa e te la mando:
          materiali, moduli e struttura pronta da caricare nel tuo Claude.
        </p>
      </div>
      <PlaybookOptinForm />
    </div>
  );
}
