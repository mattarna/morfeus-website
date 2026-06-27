import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildLocaleAlternates } from "@/lib/seo/public-indexing";
import { ORGANIZATION_ID, WEBSITE_ID, SITE_URL } from "@/lib/seo/entity-ids";
import { teamMembers } from "@/app/lib/team-data";

type Props = { params: { locale: string } };

const FOUNDER_SLUGS = ["matteo", "alex", "simone", "matteo-alvazzi"] as const;

const COPY = {
  it: {
    metaTitle: "Chi è Morfeus — consulenza e formazione AI per aziende in scaling",
    metaDesc:
      "Morfeus (Numanity S.r.l.) è la società italiana di consulenza e formazione AI: entriamo nelle aziende in scaling come Operating Partner e recuperiamo il margine perso con sistemi AI. Founder, metodo, numeri.",
    eyebrow: "Chi siamo",
    h1: "Chi è Morfeus",
    lead:
      "Morfeus (Numanity S.r.l.) è la società italiana di consulenza e formazione AI che entra nelle aziende in scaling come Operating Partner: troviamo dove perdono margine e costruiamo sistemi AI — agenti, automazioni e competenze interne — che lo recuperano, misurato in euro.",
    doH2: "Cosa facciamo",
    doBody:
      "Non siamo un'AI agency. Entriamo nei processi e nei dati di un'azienda, troviamo le perdite invisibili di margine mentre scala e le chiudiamo con sistemi AI che ogni mese dicono quanto valore hanno generato — in euro, non in slide.",
    facesIntro: "Lavoriamo su due fronti:",
    faces: [
      { title: "Lo facciamo per te", body: "Come Operating Partner B2B: entriamo, costruiamo, restiamo, e siamo misurati sui risultati." },
      { title: "Costruiamo competenza AI", body: "Formazione, community e divulgazione, per rendere l'AI una competenza interna scalabile — non una dipendenza esterna." },
    ],
    notUsH2: "Cosa NON siamo",
    notUsIntro: "Il nome «Morfeus» è affollato. Per chiarezza, Morfeus (Numanity S.r.l., Milano) non è:",
    notUsItems: [
      "morfeus.dev — un framework di agenti AI",
      "Morpheus di NVIDIA o HPE — prodotti enterprise diversi",
      "morpheusbusiness.ai — un'altra azienda",
    ],
    notUsOutro: "Siamo una società italiana di consulenza e formazione AI per aziende in scaling.",
    foundersH2: "I founder",
    foundersIntro: "Quattro founder, un'unica ossessione: trasformare l'AI in risultati misurabili.",
    teamNote: "Nel team anche",
    howH2: "Come lavoriamo",
    howBody:
      "Si parte da un Pilot — un progetto reale e circoscritto, con i criteri di valore definiti a monte. Se funziona, diventa un Retainer continuativo. Sotto a tutto gira MARF, la nostra infrastruttura AI installata dentro l'azienda, che migliora a ogni progetto.",
    trainingH2: "Formazione, community e divulgazione",
    trainingIntro: "Oltre ai clienti, costruiamo competenza AI su scala più ampia.",
    training: [
      { name: "AI Champion Program", detail: "Il percorso per creare AI Champion interni. 2.500+ persone formate." },
      { name: "AI Espresso", detail: "La newsletter settimanale di Matteo Arnaboldi. 10.000+ lettori." },
      { name: "Morfeus AI Playground", detail: "La community. 1.000+ iscritti." },
    ],
    facts: [
      { value: "2023", label: "Fondazione" },
      { value: "Milano", label: "Sede" },
      { value: "2.500+", label: "Persone formate" },
      { value: "10k+", label: "Lettori AI Espresso" },
      { value: "1.000+", label: "AI Playground" },
    ],
    ctaH2: "Parliamone",
    ctaBody: "Se la tua azienda sta scalando e senti che il margine si perde da qualche parte, possiamo trovarlo.",
    ctaButton: "Scopri come lavoriamo",
  },
  en: {
    metaTitle: "About Morfeus — AI consulting & training for scaling companies",
    metaDesc:
      "Morfeus (Numanity S.r.l.) is the Italian AI consulting & training company: we embed into scaling businesses as an Operating Partner and recover lost margin with AI systems. Founders, method, numbers.",
    eyebrow: "About us",
    h1: "About Morfeus",
    lead:
      "Morfeus (Numanity S.r.l.) is the Italian AI consulting & training company that embeds into scaling businesses as an Operating Partner: we find where they lose margin and build AI systems — agents, automations and internal skills — that recover it, measured in euros.",
    doH2: "What we do",
    doBody:
      "We are not an AI agency. We embed into a company's processes and data, find the invisible margin losses as it scales, and close them with AI systems that report — every month — how much value they generated, in euros, not slides.",
    facesIntro: "We work on two fronts:",
    faces: [
      { title: "We do it for you", body: "As a B2B Operating Partner: we embed, we build, we stay, and we are measured on results." },
      { title: "We build AI capability", body: "Training, community and education — to make AI a scalable internal skill, not an external dependency." },
    ],
    notUsH2: "What we are NOT",
    notUsIntro: "The name «Morfeus» is crowded. To be clear, Morfeus (Numanity S.r.l., Milan) is not:",
    notUsItems: [
      "morfeus.dev — an AI agent framework",
      "NVIDIA's or HPE's Morpheus — different enterprise products",
      "morpheusbusiness.ai — a different company",
    ],
    notUsOutro: "We are an Italian AI consulting & training company for scaling businesses.",
    foundersH2: "The founders",
    foundersIntro: "Four founders, one obsession: turning AI into measurable results.",
    teamNote: "Also on the team",
    howH2: "How we work",
    howBody:
      "We start with a Pilot — a real, scoped project with value criteria agreed upfront. If it works, it becomes an ongoing Retainer. Underneath it all runs MARF, our AI infrastructure installed inside the company, which improves with every project.",
    trainingH2: "Training, community & education",
    trainingIntro: "Beyond clients, we build AI capability at a broader scale.",
    training: [
      { name: "AI Champion Program", detail: "The path to build internal AI Champions. 2,500+ people trained." },
      { name: "AI Espresso", detail: "Matteo Arnaboldi's weekly newsletter. 10,000+ readers." },
      { name: "Morfeus AI Playground", detail: "The community. 1,000+ members." },
    ],
    facts: [
      { value: "2023", label: "Founded" },
      { value: "Milan", label: "HQ" },
      { value: "2,500+", label: "People trained" },
      { value: "10k+", label: "AI Espresso readers" },
      { value: "1,000+", label: "AI Playground" },
    ],
    ctaH2: "Let's talk",
    ctaBody: "If your company is scaling and you feel margin slipping somewhere, we can find it.",
    ctaButton: "See how we work",
  },
} as const;

export function generateMetadata({ params: { locale } }: Props): Metadata {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: buildLocaleAlternates("chi-siamo", safeLocale),
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      type: "website",
      url: `${SITE_URL}/${safeLocale}/chi-siamo`,
      siteName: "Morfeus",
      locale: isIt ? "it_IT" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDesc },
  };
}

export default function ChiSiamoPage({ params: { locale } }: Props) {
  const isIt = locale === "it";
  const t = isIt ? COPY.it : COPY.en;
  const safeLocale = isIt ? "it" : "en";

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/${safeLocale}/chi-siamo#aboutpage`,
    url: `${SITE_URL}/${safeLocale}/chi-siamo`,
    name: t.metaTitle,
    description: t.metaDesc,
    inLanguage: isIt ? "it-IT" : "en-US",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    mainEntity: { "@id": ORGANIZATION_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href={`/${safeLocale}`} className="font-outfit text-lg font-semibold tracking-tight">
            Morfeus
          </Link>
          <nav className="flex items-center gap-6 text-sm text-ghost-white/70">
            <Link href={`/${safeLocale}/forge`} className="transition-colors hover:text-ghost-white">Forge</Link>
            <Link href={`/${safeLocale}/lab`} className="transition-colors hover:text-ghost-white">Lab</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        {/* ① Hero */}
        <section className="pb-14 pt-20 sm:pt-28">
          <p className="mb-4 font-dm-sans text-sm uppercase tracking-[0.2em] text-neon">{t.eyebrow}</p>
          <h1 className="font-outfit text-4xl font-semibold tracking-tight sm:text-5xl">{t.h1}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ghost-white/80">{t.lead}</p>
        </section>

        {/* ② Cosa facciamo */}
        <section className="border-t border-white/10 py-14">
          <h2 className="font-outfit text-2xl font-semibold tracking-tight">{t.doH2}</h2>
          <p className="mt-5 max-w-3xl text-ghost-white/75">{t.doBody}</p>
          <p className="mt-8 text-sm uppercase tracking-widest text-ghost-white/50">{t.facesIntro}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {t.faces.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-outfit text-lg font-semibold text-vista">{f.title}</h3>
                <p className="mt-2 text-ghost-white/75">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ③ Cosa NON siamo — disambiguazione */}
        <section className="border-t border-white/10 py-14">
          <div className="rounded-2xl border border-majorelle/40 bg-majorelle/[0.06] p-7">
            <h2 className="font-outfit text-2xl font-semibold tracking-tight">{t.notUsH2}</h2>
            <p className="mt-4 text-ghost-white/80">{t.notUsIntro}</p>
            <ul className="mt-4 space-y-2">
              {t.notUsItems.map((item) => (
                <li key={item} className="flex gap-3 text-ghost-white/75">
                  <span aria-hidden className="select-none text-forge">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-medium text-ghost-white">{t.notUsOutro}</p>
          </div>
        </section>

        {/* ④ Founder */}
        <section className="border-t border-white/10 py-14">
          <h2 className="font-outfit text-2xl font-semibold tracking-tight">{t.foundersH2}</h2>
          <p className="mt-4 max-w-3xl text-ghost-white/75">{t.foundersIntro}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {FOUNDER_SLUGS.map((slug) => {
              const m = teamMembers[slug];
              return (
                <div key={slug} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <Image
                    src={m.image}
                    alt={m.name}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-outfit text-lg font-semibold leading-tight">{m.name}</p>
                    <p className="text-sm text-neon">{m.role}</p>
                    <p className="mt-1 text-sm italic text-ghost-white/60">{m.tagline}</p>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-ghost-white/70 underline-offset-4 hover:text-ghost-white hover:underline"
                    >
                      LinkedIn →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-sm text-ghost-white/55">
            {t.teamNote}: {teamMembers["davide"].name} — {teamMembers["davide"].role}.
          </p>
        </section>

        {/* ⑤ Come lavoriamo */}
        <section className="border-t border-white/10 py-14">
          <h2 className="font-outfit text-2xl font-semibold tracking-tight">{t.howH2}</h2>
          <p className="mt-5 max-w-3xl text-ghost-white/75">{t.howBody}</p>
        </section>

        {/* ⑤bis Formazione, community & divulgazione */}
        <section className="border-t border-white/10 py-14">
          <h2 className="font-outfit text-2xl font-semibold tracking-tight">{t.trainingH2}</h2>
          <p className="mt-4 max-w-3xl text-ghost-white/75">{t.trainingIntro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {t.training.map((item) => (
              <div key={item.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-outfit font-semibold text-vista">{item.name}</h3>
                <p className="mt-2 text-sm text-ghost-white/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ⑥ Fatti / numeri */}
        <section className="border-t border-white/10 py-14">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
            {t.facts.map((fact) => (
              <div key={fact.label}>
                <p className="font-outfit text-3xl font-semibold text-ghost-white">{fact.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ghost-white/50">{fact.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ⑦ CTA */}
        <section className="border-t border-white/10 py-16">
          <h2 className="font-outfit text-3xl font-semibold tracking-tight">{t.ctaH2}</h2>
          <p className="mt-4 max-w-2xl text-ghost-white/75">{t.ctaBody}</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href={`/${safeLocale}/forge`}
              className="rounded-full bg-majorelle px-7 py-3 font-medium text-white transition-colors hover:bg-persian"
            >
              {t.ctaButton}
            </Link>
            <a href="mailto:hello@morfeushub.com" className="text-ghost-white/70 hover:text-ghost-white">
              hello@morfeushub.com
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-3 px-6 py-10 text-sm text-ghost-white/50 sm:flex-row">
          <span>© 2026 Morfeus — Numanity S.r.l. · Milano</span>
          <a href="mailto:hello@morfeushub.com" className="hover:text-ghost-white">hello@morfeushub.com</a>
        </div>
      </footer>
    </>
  );
}
