#!/usr/bin/env bash
set -euo pipefail

IMPORT_DIR="_import/Skills"
OUT_DIR="skills"

if [ ! -d "$IMPORT_DIR" ]; then
  echo "ERROR: Missing $IMPORT_DIR"
  exit 1
fi

# Helper: extract a YAML key from the frontmatter (simple, robust for single-line values)
extract_key() {
  local file="$1"
  local key="$2"
  awk -v k="$key" '
    BEGIN{infm=0}
    /^---[[:space:]]*$/ { if (infm==0) {infm=1; next} else {exit} }
    infm==1 {
      # match "key: value"
      if ($0 ~ "^"k":[[:space:]]*") {
        sub("^"k":[[:space:]]*", "", $0)
        print $0
        exit
      }
    }
  ' "$file"
}

migrated=0
skipped=0

for d in "$IMPORT_DIR"/*; do
  [ -d "$d" ] || continue

  src="$d/SKILL.md"
  if [ ! -f "$src" ]; then
    echo "SKIP: $d has no SKILL.md"
    skipped=$((skipped+1))
    continue
  fi

  name="$(extract_key "$src" "name")"
  scope="$(extract_key "$src" "scope")"

  if [ -z "${name:-}" ] || [ -z "${scope:-}" ]; then
    echo "SKIP: missing name/scope in $src"
    skipped=$((skipped+1))
    continue
  fi

  # normalize scope: allow global but map to cross unless you want a global folder
  # We'll keep "global" as folder name only if it exists.
  target_scope="$scope"

  # Ensure scope folder exists
  mkdir -p "$OUT_DIR/$target_scope"

  dest="$OUT_DIR/$target_scope/$name.md"
  cp "$src" "$dest"

  migrated=$((migrated+1))
  echo "OK: $name -> $dest"
done

echo ""
echo "Migrated: $migrated"
echo "Skipped:  $skipped"
