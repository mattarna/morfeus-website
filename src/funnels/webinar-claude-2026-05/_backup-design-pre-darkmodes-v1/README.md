# Backup pre-darkmodes (round design)

Snapshot dei 3 file v2 prima di:
- Aggiunta section divider sottile tra le sezioni
- Introduzione "dark medio" alternato per ritmo visivo
- Conversione SalesV2ReviewsSection in crema (paper warm + testo dark)

Per rollback completo:
```bash
cp _backup-design-pre-darkmodes-v1/sections-v2.tsx.bak ../sections-v2.tsx
cp _backup-design-pre-darkmodes-v1/sales-v2-config.json.bak ../sales-v2-config.json
cp _backup-design-pre-darkmodes-v1/sections.module.css.bak ../sections.module.css
```

Per rollback parziale (solo Reviews): vedi diff su SalesV2ReviewsSection.
