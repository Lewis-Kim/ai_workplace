#!/bin/bash
# =====================================
# n8n workflow import script
# =====================================

SERVICE_NAME="n8n"
INPUT_DIR="./workflows"

echo "▶ Importing n8n workflows from $INPUT_DIR"

docker-compose exec "$SERVICE_NAME" n8n import:workflow \
  --input="/workflows"

echo "✅ Import completed."
