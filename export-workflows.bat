
@echo off
REM ==========================================
REM n8n workflow export (Windows BAT)
REM ==========================================

set SERVICE_NAME=n8n
set OUTPUT_DIR=workflows

if not exist %OUTPUT_DIR% (
  mkdir %OUTPUT_DIR%
)

echo ▶ Exporting n8n workflows...

REM n8n list:workflow 결과에서 ID|NAME 만 처리
for /f "usebackq tokens=1,2 delims=|" %%A in (`
  docker-compose exec -T %SERVICE_NAME% n8n list:workflow ^| find "|"
`) do (

  set ID=%%A
  set NAME=%%B

  REM delayed expansion 필요
  call set SAFE_NAME=%%NAME: =_%%
  call set FILE_NAME=%%SAFE_NAME%%_%%ID%%.json

  echo  - exporting: %%B ^(id=%%A^) → !FILE_NAME!

  docker-compose exec -T %SERVICE_NAME% n8n export:workflow ^
    --id=%%A ^
    --output=/workflows/!FILE_NAME!
)

echo ✅ Export completed.
