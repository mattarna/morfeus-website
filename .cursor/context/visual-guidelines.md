# MORFEUS Visual Guidelines

## 01 — LOGO SYSTEM
### Concept
Metamorfosi: da blocco geometrico rigido a forma organica fluida. Basato su griglie concentriche (struttura + misura).

### Versioni & Uso
- **Combination mark orizzontale**: Default (sito, deck, documenti).
- **Combination mark verticale**: Social, avatar, app icon.
- **Solo pictogramma**: Favicon, watermark, badge.
- **Bianco su dark**: Per Night, Midnight, Persian, Majorelle.
- **Nero su light**: Per Ghost White, white, lightBg.
- **Forge su dark**: Solo per applicazioni speciali.

### Regole
- **Spazio di rispetto**: Altezza della lettera "M" in ogni direzione.
- **Dimensioni minime**: 120px (combo digitale), 32px (solo pictogramma digitale).
- **Divieti**: No stretch, no rotazione, no ombre/glow, no colori fuori palette.

## 02 — PALETTE COLORI
### Sistema Cromatico
| Nome | HEX | Ruolo |
| :--- | :--- | :--- |
| **Night** | #0B0B0C | Background principale, dark mode |
| **Midnight Blue** | #201F6E | Sfondi deep, gradienti |
| **Persian Blue** | #392CB8 | Profondità gradienti |
| **Majorelle Blue** | #533DFC | **CORE**: Logo, H1, CTA secondarie |
| **Neon Blue** | #6475FA | **ACTIVE**: Hover, link, micro-interazioni |
| **Vista Blue** | #8CA5F7 | **SUPPORT**: Testo secondario, label, border |
| **Ghost White** | #E4E7F0 | **LIGHT**: Background light, card |
| **Forge** | #E8650A | **ACCENT**: CTA primarie, KPI critici |

### Regola 80 / 15 / 5
- **80%**: Palette blu (Night, Midnight, Persian, Majorelle, Neon, Vista, Ghost).
- **15%**: Bianchi e neutri.
- **5%**: **Forge** (solo alta priorità). *Se supera il 5%, perde forza.*

### Combinazioni Approvate
- **Night**: White, Ghost White, Majorelle, Forge.
- **Midnight**: White, Ghost White, Neon, Forge.
- **Majorelle**: White, Night (testo), Ghost White.
- **Ghost White**: Night, Majorelle, Midnight, Forge.

### Combinazioni Vietate
- Forge + Neon Blue (vibrazione cromatica).
- Persian su Midnight (contrasto basso).
- Vista su Ghost White (contrasto basso).
- Forge come body text.

## 03 — TIPOGRAFIA
### Font: Prodigy Sans
Alternativa Google Fonts: **DM Sans** (Regular + Bold).

### Scala Tipografica
- **Display / Hero**: 64–80pt Black (tracking -20, solo dark bg).
- **H1**: 40pt Bold (tracking -10).
- **H2**: 28pt SemiBold.
- **H3**: 22pt Medium.
- **LABEL**: 13pt Bold UPPERCASE (tracking +80).
- **Body Regular**: 16pt (line-height 1.6).
- **KPI**: 48–64pt Black (Forge o Majorelle).
- **CTA**: 16pt SemiBold (tracking +20).

### Regole Critiche
- Max 3 livelli di gerarchia per schermata.
- KPI sempre dominanti visivamente.
- Body text max 65 caratteri per riga.
- Quote/Callout italici su sfondo colorato (non floating su white).

## 04 — STILE VISIVO
### Tensioni Fondamentali
1. **Rigido ↔ Fluido**: Geometria che diventa organica.
2. **Scuro ↔ Luminoso**: Background dark con picchi di luce.
3. **Tecnico ↔ Umano**: Precisione meccanica al servizio dell'uomo.

### Direzione Fotografica
- **Sì**: Mano robotica/umana, superfici 3D blu, strutture meccaniche precise, data viz astratta, spazi aziendali reali.
- **No**: Stock persone sorridenti, città futuristiche generiche, grafici crescita stock, post-it colorati.

### Layout
- Asimmetria controllata (60/40 o 70/30).
- Un solo elemento dominante per schermata.
- Spazio bianco generoso.
- **Border Radius**: 4px (small), 8px (card), 16px (modal).

## 05 — COMPONENTI UI
- **Primary CTA**: Background Forge, Text White, Bold 16pt, radius 6px.
- **Secondary CTA**: Background Majorelle, Text White, SemiBold 16pt, radius 6px.
- **Card KPI**: Background Night, Border-top 3px Forge, KPI 64pt Black.
- **Data Viz**: Majorelle (primario), Neon (secondario), Forge (negativo/perdita).
