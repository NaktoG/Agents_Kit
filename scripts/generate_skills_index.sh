#!/usr/bin/env bash
set -euo pipefail

OUT="skills/SKILLS_INDEX.md"
SCOPES_FILE="core/scopes.md"

echo "# Skills Index" > "$OUT"
echo "" >> "$OUT"
echo "| Name | Scope | Auto Invoke | Triggers | Dependencies |" >> "$OUT"
echo "|------|-------|-------------|----------|--------------|" >> "$OUT"

allowed_scopes=$(sed -n '/^- /p' "$SCOPES_FILE" | sed 's/- //')

errors=0

extract() {
  local file="$1"
  local key="$2"
  awk -v k="$key" '
    BEGIN{infm=0}
    /^---[[:space:]]*$/ { if (infm==0) {infm=1; next} else {exit} }
    infm==1 {
      if ($0 ~ "^"k":[[:space:]]*") {
        sub("^"k":[[:space:]]*", "", $0)
        print $0
        exit
      }
    }
  ' "$file"
}

for f in $(find skills -type f -name "*.md" ! -name "README.md" ! -name "SKILLS_INDEX.md"); do
  name=$(extract "$f" "name")
  scope=$(extract "$f" "scope")
  auto=$(extract "$f" "auto_invoke")
  triggers=$(extract "$f" "trigger")
  deps=$(extract "$f" "dependencies")

  if ! echo "$allowed_scopes" | grep -qx "$scope"; then
    echo "⚠️ Invalid scope '$scope' in $f"
    errors=$((errors+1))
  fi

  echo "| $name | $scope | $auto | $triggers | $deps |" >> "$OUT"
done

echo ""
echo "Index generated at $OUT"
echo "Scope errors: $errors"
