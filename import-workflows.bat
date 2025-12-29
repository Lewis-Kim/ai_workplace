@echo off
setlocal EnableDelayedExpansion

set "SERVICE_NAME=n8n"
set "WORKFLOW_DIR=workflows"
set "COMPOSE_CMD=docker-compose"

echo Importing n8n workflows from .\%WORKFLOW_DIR%
echo.

for %%F in ("%WORKFLOW_DIR%\*.json") do (
  echo importing: %%~nxF

  %COMPOSE_CMD% exec -T %SERVICE_NAME% n8n import:workflow ^
    --input="/workflows/%%~nxF" ^
    --separate
)

echo.
echo Import completed (no warnings).
endlocal
