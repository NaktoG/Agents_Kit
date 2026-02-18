#!/usr/bin/env bash
set -euo pipefail

OUT="agents/AGENTS_INDEX.md"

echo "# Agents Index" > "$OUT"
echo "" >> "$OUT"
echo "| Agente | Rol | Auto-invoke destacado |" >> "$OUT"
echo "|--------|-----|-----------------------|" >> "$OUT"

shopt -s nullglob
while IFS= read -r f; do
  base=$(basename "$f")
  [ "$base" = "AGENTS_INDEX.md" ] && continue

  name="${base%.md}"

  role=$(awk '
    /^## Rol/ {getline; print; exit}
  ' "$f")

  autoinvoke=$(awk '
    /^## Auto-invoke/ {flag=1; next}
    /^## / {flag=0}
    flag {print}
  ' "$f" | head -n 2 | tr '\n' '; ')

  echo "| $name | ${role:-ver archivo} | ${autoinvoke:-ver archivo} |" >> "$OUT"
done < <(printf '%s\n' agents/*.md | LC_ALL=C sort)

echo ""
echo "Agents index generated at $OUT"
