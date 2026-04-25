# Brevo — reference operativa

Questa è la **fonte di verità** per integrazione Brevo (CRM/email automation).
Prima di scrivere/modificare qualunque endpoint che parla con Brevo, leggi questo file.

> Codice associato: [src/lib/brevo/attributes.ts](../src/lib/brevo/attributes.ts), [src/lib/brevo/lists.ts](../src/lib/brevo/lists.ts)

---

## Regola d'oro

**Mai usare stringhe raw per i nomi degli attributi.** Sempre `BREVO_ATTR.NOME`, mai `"NOME"`.
Questo previene gli errori silenziosi (es. scrivere su `FIRSTNAME` quando il campo custom è `NOME`).

---

## Custom attributes (campi contatto)

I nomi qui sotto sono quelli **realmente usati** nell'account Brevo Morfeus.
Sono case-sensitive e devono matchare esattamente.

### Identity
| Costante | Valore Brevo | Tipo | Note |
|---|---|---|---|
| `NOME` | `NOME` | Testo | Nome di battesimo. **Usare questo, non `FIRSTNAME`** |
| `COGNOME` | `COGNOME` | Testo | Cognome. **Usare questo, non `LASTNAME`** |

### Contact channels
| Costante | Valore Brevo | Tipo | Note |
|---|---|---|---|
| `TELEFONO` | `TELEFONO_` | Testo | **Underscore finale intenzionale** |
| `WHATSAPP` | `WHATSAPP` | Testo | |
| `LANDLINE_NUMBER` | `LANDLINE_NUMBER` | Testo | |
| `SMS` | `SMS` | Testo | |
| `LINKEDIN` | `LINKEDIN` | Testo | URL profilo |

### Professional context
| Costante | Valore Brevo | Tipo | Note |
|---|---|---|---|
| `AZIENDA` | `AZIENDA` | Testo | |
| `JOB_TITLE` | `JOB_TITLE` | Testo | Posizione lavorativa |
| `NUMERO_DIPENDENTI` | `NUMERO_DIPENDENTI` | Testo | |
| `BIO` | `BIO` | Testo | |

### Acquisition / lifecycle
| Costante | Valore Brevo | Tipo | Note |
|---|---|---|---|
| `FORM_NAME` | `FORM_NAME` | Testo | **Sempre popolare**: identifica la sorgente del contatto. Convenzione: `Freebie_X`, `Webinar_Y`, `LeadMagnet_Z` |
| `REFERRAL_NAME` | `REFERRAL_NAME` | Testo | |
| `WS_DAY` | `WS_DAY` | Testo | |
| `DATA_ENTRATA` | `DATA_ENTRATA` | Testo | |
| `CREATED_AT` | `CREATED_AT` | Data | |
| `OPT_IN` | `OPT_IN` | Booleano | |
| `DOUBLE_OPT_IN` | `DOUBLE_OPT-IN` | Categoria | **Trattino intenzionale** nel nome Brevo |
| `ACTIVE_STATUS` | `ACTIVE_STATUS` | Booleano | |

### System
| Costante | Valore Brevo | Tipo |
|---|---|---|
| `EXT_ID` | `EXT_ID` | Testo |
| `CONTACT_TIMEZONE` | `CONTACT_TIMEZONE` | Testo |

---

## Liste

Le list ID vivono come env var su Vercel (production + preview).
Mai hardcodare gli ID nel codice: usare `getBrevoListId()` da [src/lib/brevo/lists.ts](../src/lib/brevo/lists.ts).

| Chiave | Env var | ID Brevo | Nome dashboard | Uso |
|---|---|---|---|---|
| `WEBINAR_CLAUDE_5MAG` | `BREVO_WEBINAR_LIST_ID` | `54` | Webinar Claude \| 5 Maggio 2026 | Iscritti webinar 5 maggio 2026 |
| `FREEBIE_COWORK_SETUP_SKILL` | `BREVO_FREEBIE_SKILL_LIST_ID` | `56` | Freebie_cowork_setup_skill | Chi ha scaricato la skill "Cowork Setup Creator" |

---

## API key

| Env var | Note |
|---|---|
| `BREVO_API_KEY` | Primary key |
| `BREVO_API_KEY_V2` | Fallback (gli endpoint provano prima V2 poi V1) |

---

## Convenzione FORM_NAME

Il valore di `FORM_NAME` è la **fonte di verità** per sapere da quale form/funnel
arriva un contatto. Convenzione:

- **Webinar**: `webinar-<topic>` (es. `webinar-claude`)
- **Freebie**: `Freebie_<nome_skill_o_risorsa>` (es. `Freebie_cowork_setup_skill`)
  → deve **matchare il nome della list Brevo** (case-sensitive) per coerenza
- **Lead magnet generico**: `LeadMagnet_<topic>`

Ogni endpoint deve avere un `DEFAULT_FORM_NAME` come fallback nel server, e il
frontend deve passare il valore via `payload.source`.

## Pattern standard endpoint opt-in

Ogni endpoint `/api/funnels/<funnel>/optin` deve:

1. Validare payload (almeno `email` valida + altri required)
2. Leggere `BREVO_API_KEY_V2 || BREVO_API_KEY` — se manca → 500
3. Risolvere list ID via `getBrevoListId(<chiave>)` (può essere multipla)
4. POST a `https://api.brevo.com/v3/contacts` con:
   - `email`
   - `attributes`: usando **costanti `BREVO_ATTR.*`**, mai stringhe raw
   - `listIds`: array (può essere multipla per auto-enrollment cross-list)
   - `updateEnabled: true` (per non fallire su contatti esistenti)
5. Su error → ritornare `{ success: false, error: "brevo_contact_failed", details }` con status 502
6. Su success → `{ success: true }`

Endpoint di riferimento:
- [src/app/api/funnels/webinar-claude/optin/route.ts](../src/app/api/funnels/webinar-claude/optin/route.ts) — list singola
- [src/app/api/funnels/freebie-cowork-setup-skill/optin/route.ts](../src/app/api/funnels/freebie-cowork-setup-skill/optin/route.ts) — auto-enroll a 2 list (freebie + webinar)

---

## Aggiungere un nuovo campo o lista

1. Crearlo su Brevo dashboard
2. Aggiornare la costante in [attributes.ts](../src/lib/brevo/attributes.ts) o [lists.ts](../src/lib/brevo/lists.ts)
3. Aggiornare la tabella in **questo file**
4. Se è una list: aggiungere env var su Vercel (production + preview)
