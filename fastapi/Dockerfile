FROM python:3.11-slim

WORKDIR /app

# requirements 먼저 복사 (캐시 최적화)
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# 앱 소스 복사
COPY main.py .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
