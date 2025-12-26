#!/bin/bash
# ==========================================
# Import ONLY changed n8n workflows (Git)
# ==========================================

SERVICE_NAME="n8n"
WORKFLOW_DIR="workflows"

# 기준 브랜치 (필요하면 main / develop 변경)
BASE_BRANCH="origin/develop"

echo "▶ Detecting changed workflow files..."

CHANGED_FILES=$(git diff --name-only "$BASE_BRANCH"...HEAD \
  | grep "^${WORKFLOW_DIR}/.*\.json$")

if [ -z "$CHANGED_FILES" ]; then
  echo "ℹ️ No workflow changes detected."
  exit 0
fi

echo "▶ Workflows to import:"
echo "$CHANGED_FILES"

echo
read -p "Continue importing these workflows? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
  echo "❌ Import cancelled."
  exit 0
fi

for file in $CHANGED_FILES; do
  filename=$(basename "$file")
  echo " - importing: $filename"

  docker-compose exec -T "$SERVICE_NAME" n8n import:workflow \
    --input="/workflows/$filename"
done

echo "✅ Import completed successfully."
