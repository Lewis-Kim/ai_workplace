@echo off
setlocal EnableDelayedExpansion

REM ==========================================
REM n8n workflow import (NO WARNINGS)
REM ==========================================

set "SERVICE_NAME=n8n"
set "WORKFLOW_DIR=workflows"
set "COMPOSE_CMD=docker compose"

echo Importing n8n workflows from .\%WORKFLOW_DIR%
echo.

REM JSON 파일 존재 여부 체크
if not exist "%WORKFLOW_DIR%\*.json" (
  echo No workflow JSON files found.
  goto :eof
)

for %%F in ("%WORKFLOW_DIR%\*.json") do (
  echo importing: %%~nxF

  %COMPOSE_CMD% exec -T %SERVICE_NAME% n8n import:workflow ^
    --input="/workflows/%%~nxF" ^
    --separate
)

echo.
echo Import completed (no warnings).
endlocal
