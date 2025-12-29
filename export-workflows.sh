#!/usr/bin/env zsh

SERVICE_NAME="n8n"
OUTPUT_DIR="./workflows"

mkdir -p "$OUTPUT_DIR"
echo "▶ Exporting n8n workflows..."

# 🔑 zsh 배열로 한 번에 읽기 (stdin 안전)
WORKFLOWS=("${(@f)$(docker-compose exec -T "$SERVICE_NAME" n8n list:workflow | grep '|')}")

echo "▶ Found workflows: ${#WORKFLOWS[@]}"

for line in "${WORKFLOWS[@]}"; do
  id="${line%%|*}"
  name="${line#*|}"

  safe_name="${name// /_}"
  safe_name="${safe_name//[^a-zA-Z0-9_]/}"
  file_name="${safe_name}_${id}.json"

  echo " - exporting: $name (id=$id)"

  docker-compose exec -T "$SERVICE_NAME" n8n export:workflow \
    --id="$id" \
    --output="/workflows/$file_name"
done

echo "✅ Export completed."
