### 프로젝트 명 : (가칭) AI 워크플레이스 -  AI기반 사내 업무지원 시스템 구축안

### 추진 배경 및 필요성
파편화된 데이터와 비효율적 업무 환경을 개선하여 ‘AI기반 디지털 혁신' 가속화 필요

### 현황 및 문제점 (Pain Points)
- 데이터 파편화: 각종 보고서, 결제 문서, 로그 등 데이터가 산재되어 통합 관리 부재
- 비용 증가: 사내 콘텐츠 관리/서비스를 위한 중복 투자 및 운영 비용 과다 발생
- 사용자 불편: 다수의 콘텐츠 접점으로 인해 정보 검색에 많은 시간 소요

### 추진 필요성 (Needs)
- 생산성 향상: 사내 콘텐츠 관리 효율화를 통해 임직원 업무 생산성 극대화
- 비용 절감: 시스템 통합(DCP)을 통한 중복 투자 방지 및 운영 효율화
- 고객 만족: 콘텐츠 제공 채널 통합으로 대내외 고객 편의성 제고

---
## 프로젝트 시작하기

### GIT 설치
- https://git-scm.com/

### 초기설정
```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```
[참조] https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-Git-%EC%B5%9C%EC%B4%88-%EC%84%A4%EC%A0%95

### git 사용방법

1. 원격 레파티토리에서 최신 소스를 다운받는다. 
```
git pull
```

2. 소스수정 후 변경사항을 확인한다. 
```bash
git status
```

3. 변경사항을 staging 상태로 올린다. 
```bash
git add <수정된 파일명>
```

4. 변경사항을 commit (save) 한다. 
```bash
git commit -m '저장 메세지'
```

5. 변경사항을 Remote Repository 로 push 한다. 
```bash
git push origin main
```

## 프로젝트 다운로드
```bash
git clone https://github.com/Lewis-Kim/ai-workplace.git
```

## 프로젝트 구조
```bash
ai_workplace/
 ├─ docker-compose.yml
 ├─ export-workflows.sh     리눅스/맥 사용자 파일
 ├─ export-workflows.bat    윈도우 사용자 파일
 ├─ import-workflows.sh     리눅스/맥 사용자 파일
 ├─ import-workflows.bat    윈도우 사용자 파일
 ├─ .env
 ├─ workflows/              ✅ Git 관리 (순수 JSON)
 │   ├─ order_flow.json
 │   └─ slack_alert.json
 └─ n8n_runtime/            ❌ Git 제외 (n8n 내부 데이터)
     ├─ database.sqlite
     ├─ credentials/
     └─ config

```

## n8n 서비스 시작, 종료하기
프로젝트 폴더에서 아래와 같이 실행한다. 
```bash
cd ai-workplace
docker compose up -d  # 도커 컴포즈 시작하기
docker compose down   # 도커 컴포즈 종료하기
```
- 접속 URL : http://localhost:5678

## n8n Workflow Export
```bash
$ ./export-workflows.sh
```
- n8n 에서 작업한 모든 workflow 를 worflows 폴더로 내보내기. 
- 명령 실행 후 workflows 폴더에서 <workflow 명>_<ID 명>.json 파일 확인한다.

## n8n Workflow Import
```bash
$ ./import-workflows.sh
```
- workflow 폴더의 모든 json 파일을 n8n 으로 Import 한다. 

## 윈도우 cmd 사용자.
```cmd
cd 프로젝트폴더 로이동
.\export-workflows.bat
```

## 윈도우 powershell 사용자
```powershell
powershell을 관리자 권한으로 실행
cd 프로젝트폴더 로이동
cmd /c .\export-workflows.bat
```
