FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY saga_orchestrator.py .

EXPOSE 8000

CMD ["uvicorn", "saga_orchestrator:app", "--host", "0.0.0.0", "--port", "8000"]
