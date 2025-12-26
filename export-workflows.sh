#!/bin/bash
SERVICE_NAME="n8n"
OUTPUT_DIR="./workflows"

mkdir -p "$OUTPUT_DIR"
echo "▶ Exporting n8n workflows..."

# list:workflow 출력에서 "ID|NAME" 라인만 처리
docker-compose exec -T "$SERVICE_NAME" n8n list:workflow \
| grep '|' \
| while IFS='|' read -r id name; do
  # 안전한 파일명
  safe_name=$(echo "$name" | tr ' ' '_' | tr -cd '[:alnum:]_')
  file_name="${safe_name}_${id}.json"

  echo " - exporting: $name (id=$id) → $file_name"

  docker-compose exec -T "$SERVICE_NAME" n8n export:workflow \
    --id="$id" \
    --output="/workflows/$file_name"
done

echo "✅ Export completed."
