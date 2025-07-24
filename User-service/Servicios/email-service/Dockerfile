# Usa la imagen oficial de Python
FROM python:3.11

# Crea usuario no-root seguro
RUN useradd --create-home appuser

# Carpeta de trabajo
WORKDIR /home/appuser/app

# Copia e instala dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente
COPY email_service.py .
COPY templates/ templates/ 

# Da permisos al usuario no-root
RUN chown -R appuser:appuser /home/appuser/app

USER appuser

EXPOSE 5001

# Ejecuta FastAPI con Uvicorn
CMD ["uvicorn", "email_service:app", "--host", "0.0.0.0", "--port", "5001"]
