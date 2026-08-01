# Stampa il riferimento git all'avvio di ogni sessione Claude Code.
# Scopo: impedire che una sessione parli del "sito online" leggendo un albero
# che non e' la produzione. Vercel pubblica SOLO main.
# Agganciato da .claude/settings.json come hook SessionStart.

$ErrorActionPreference = "SilentlyContinue"

$branch = (git rev-parse --abbrev-ref HEAD 2>$null)
if (-not $branch) { return }

$mainInfo = (git log -1 --format="%h  %ad  %s" --date=short main 2>$null)
$dietro   = [int](git rev-list --count "HEAD..main" 2>$null)   # commit che main ha e io no
$avanti   = [int](git rev-list --count "main..HEAD" 2>$null)   # commit miei non su main
$sporco   = (git status --porcelain 2>$null | Measure-Object -Line).Lines

Write-Output "== RIFERIMENTO GIT (letto all'avvio della sessione) =="
Write-Output "Branch corrente : $branch"
Write-Output "main            : $mainInfo"

# Cio' che conta non e' il nome del branch, e' la distanza dal contenuto di main.
if ($dietro -gt 0) {
  Write-Output "Stato           : ATTENZIONE - questo albero NON e' il sito online."
  Write-Output "                  main ha $dietro commit che qui non ci sono."
  if ($avanti -gt 0) { Write-Output "                  e qui ci sono $avanti commit non ancora in produzione." }
} elseif ($avanti -gt 0) {
  Write-Output "Stato           : allineato a main, piu' $avanti commit non ancora in produzione."
  Write-Output "                  Tutto il resto coincide con il sito online."
} else {
  Write-Output "Stato           : coincide con main, quindi con il sito online."
}
if ($sporco -gt 0) {
  Write-Output "                  $sporco file modificati non committati: quelli NON sono online."
}

Write-Output ""
Write-Output "REGOLA: Vercel pubblica main. Per qualsiasi affermazione su 'il sito',"
Write-Output "        'cosa vedono i clienti' o 'cosa e' online, leggi da main, non dal disco:"
Write-Output "          git show main:docs/site-tree.md      <- mappa pagine, con colonna live / non ancora live"
Write-Output "          git show main:<percorso/del/file>"
Write-Output "        Se leggi dal working tree, dichiaralo: vale per il branch, non per il sito."
Write-Output "        Gerarchia di verita: working tree < branch < main < deploy servito."
