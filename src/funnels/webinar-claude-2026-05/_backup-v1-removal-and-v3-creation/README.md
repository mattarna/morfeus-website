# Backup pre-rimozione v1 + creazione v3

Snapshot dell'unico file fisicamente cancellato: `sales-config.json`
(config del funnel `claude-unlocked-v1`).

Per il resto, il git history è il backup primario — i commit di questo
round sono dedicati e revertable singolarmente.

## Rollback completo

```bash
# Ripristino del file rimosso
cp _backup-v1-removal-and-v3-creation/sales-config.json.bak ../sales-config.json

# Per ripristinare registry.ts, layout.tsx, ecc.:
git revert <hash-del-commit-rimozione-v1>
git revert <hash-del-commit-creazione-v3>
```

## Cosa non è stato cancellato (dead code accettato)

- `sections.tsx` mantiene tutti i 24 export `Sales*` (lì sono dead code, ma il file ospita anche i `Webinar*` usati dal funnel webinar-claude — lasciato intatto)
- `componentMap.tsx`, `types.ts`, `loader.ts` mantengono i nomi `Sales*` (codice morto innocuo)

Cleanup completo possibile in seconda iterazione.
