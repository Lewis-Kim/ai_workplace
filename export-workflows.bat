@echo off
setlocal EnableDelayedExpansion

REM ================================
REM n8n workflow export (SAFE)
REM ================================

set "SERVICE_NAME=n8n_project3"
set "OUTPUT_DIR=workflows"
set "COMPOSE_CMD=docker-compose"
set "TMP_FILE=_wf_list.tmp"

if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

echo Exporting n8n workflows...
echo.

REM 1. 워크플로우 목록을 임시 파일로 저장
%COMPOSE_CMD% exec -T %SERVICE_NAME% n8n list:workflow > "%TMP_FILE%"

REM 2. 한 줄씩 안전하게 처리
for /f "tokens=1,* delims=|" %%A in (%TMP_FILE%) do (

  set "ID=%%A"
  set "NAME=%%B"

  if "!ID!"=="" goto :continue

  REM 파일명 안전화
  set "SAFE_NAME=!NAME!"
  set "SAFE_NAME=!SAFE_NAME: =_!"
  set "SAFE_NAME=!SAFE_NAME:/=_!"
  set "SAFE_NAME=!SAFE_NAME:\=_!"
  set "SAFE_NAME=!SAFE_NAME::=_!"

  set "FILE_NAME=!SAFE_NAME!_!ID!.json"

  echo exporting: !NAME! (id=!ID!)

  %COMPOSE_CMD% exec -T %SERVICE_NAME% n8n export:workflow ^
    --id=!ID! ^
    --output="/workflows/!FILE_NAME!"

  :continue
)

del "%TMP_FILE%" >nul 2>&1

echo.
echo Export completed.
endlocal
