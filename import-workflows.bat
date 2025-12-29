@echo off
REM ==========================================
REM n8n workflow import (Windows BAT)
REM ==========================================

set SERVICE_NAME=n8n
set WORKFLOW_DIR=workflows
set COMPOSE_CMD=docker compose

echo ▶ Importing n8n workflows from .\%WORKFLOW_DIR%
echo.

if not exist "%WORKFLOW_DIR%\*.json" (
  echo ℹ️ No workflow JSON files found.
  goto :eof
)

for %%F in ("%WORKFLOW_DIR%\*.json") do (
  echo  - importing: %%~nxF

  %COMPOSE_CMD% exec -T %SERVICE_NAME% n8n import:workflow ^
    --input="/workflows/%%~nxF"

  if errorlevel 1 (
    echo ❌ Failed to import %%~nxF
    goto :eof
  )
)

echo.
echo ✅ Import completed successfully.
