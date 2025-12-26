#!/bin/bash
# =====================================
# Safe n8n workflow import (file by file)
# =====================================

SERVICE_NAME="n8n"
WORKFLOW_DIR="workflows"

echo "▶ Importing n8n workflows from ./$WORKFLOW_DIR"

FILES=$(ls "$WORKFLOW_DIR"/*.json 2>/dev/null)

if [ -z "$FILES" ]; then
  echo "ℹ️ No workflow JSON files found."
  exit 0
fi

for file in $FILES; do
  filename=$(basename "$file")
  echo " - importing: $filename"

  docker-compose exec -T "$SERVICE_NAME" n8n import:workflow \
    --input="/workflows/$filename"
done

echo "✅ Import completed successfully."
