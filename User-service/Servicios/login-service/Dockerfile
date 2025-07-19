FROM python:3.11

# Crea usuario seguro
RUN useradd --create-home appuser

# Carpeta de trabajo
WORKDIR /home/appuser/app

# Instala dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente
COPY Login_service.py .
COPY db_connection.py .

# Cambia permisos para evitar problemas
RUN chown -R appuser:appuser /home/appuser/app

USER appuser

EXPOSE 6000

CMD ["uvicorn", "Login_service:app", "--host", "0.0.0.0", "--port", "6000"]
