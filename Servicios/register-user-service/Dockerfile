FROM python:3.11

# Crea usuario seguro
RUN useradd --create-home appuser

# Carpeta de trabajo
WORKDIR /home/appuser/app

# Instala dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente
COPY RegisterUser_service.py .
COPY db_connection.py .

# Cambia permisos para evitar problemas
RUN chown -R appuser:appuser /home/appuser/app

USER appuser

EXPOSE 5000

CMD ["uvicorn", "RegisterUser_service:app", "--host", "0.0.0.0", "--port", "5000"]
