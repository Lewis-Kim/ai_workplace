@echo off
REM =====================================
REM Safe n8n workflow import (Windows BAT)
REM =====================================

set SERVICE_NAME=n8n
set WORKFLOW_DIR=workflows

echo ▶ Importing n8n workflows from .\%WORKFLOW_DIR%

REM workflows 폴더 존재 확인
if not exist "%WORKFLOW_DIR%" (
  echo ℹ️ Directory "%WORKFLOW_DIR%" does not exist.
  goto :eof
)

REM JSON 파일 존재 확인
dir "%WORKFLOW_DIR%\*.json" >nul 2>&1
if errorlevel 1 (
  echo ℹ️ No workflow JSON files found.
  goto :eof
)

REM JSON 파일 하나씩 import
for %%F in (%WORKFLOW_DIR%\*.json) do (
  echo - importing: %%~nxF

  docker-compose exec -T %SERVICE_NAME% n8n import:workflow ^
    --input="/workflows/%%~nxF"
)

echo ✅ Import completed successfully.
