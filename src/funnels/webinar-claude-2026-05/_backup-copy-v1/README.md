# Backup pre-revisione copy v2

**Data**: 27 aprile 2026

Backup del codice della sales page **prima** di applicare la revisione copy v2 (`copy/SALES_PAGE_COPY_V2.md`).

## Cosa contiene

- `sections.tsx.bak` — copia di `src/funnels/webinar-claude-2026-05/sections.tsx`
- `sales-config.json.bak` — copia di `src/funnels/webinar-claude-2026-05/sales-config.json`

## Backup git

Esiste anche un git tag: **`sales-copy-v1-backup`** sul commit `000e1c9`.

Per fare diff fra v1 e v2:
```bash
git diff sales-copy-v1-backup..HEAD -- src/funnels/webinar-claude-2026-05
```

Per ripristinare i file v1:
```bash
git checkout sales-copy-v1-backup -- src/funnels/webinar-claude-2026-05/sections.tsx src/funnels/webinar-claude-2026-05/sales-config.json
```

## Quando rimuovere

Una volta che la copy v2 è approvata e va in produzione, **eliminare**:
- L'intera cartella `_backup-copy-v1/`
- Opzionale: il git tag (`git tag -d sales-copy-v1-backup` + `git push origin :refs/tags/sales-copy-v1-backup`)
