@echo off
REM ==========================================
REM n8n workflow import (Windows BAT)
REM ==========================================

set SERVICE_NAME=n8n
set WORKFLOW_DIR=workflows

echo ▶ Importing n8n workflows from .\%WORKFLOW_DIR%

if not exist %WORKFLOW_DIR%\*.json (
  echo ℹ️ No workflow JSON files found.
  goto :eof
)

for %%F in (%WORKFLOW_DIR%\*.json) do (
  echo  - importing: %%~nxF

  docker-compose exec -T %SERVICE_NAME% n8n import:workflow ^
    --input=/workflows/%%~nxF
)

echo ✅ Import completed successfully.
