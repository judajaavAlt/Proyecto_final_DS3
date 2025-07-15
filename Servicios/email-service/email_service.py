# email_service.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

class EmailRequest(BaseModel):
    email: str
    token: str

class WelcomeRequest(BaseModel):
    email: str

@app.post("/send-confirmation/")
async def send_confirmation(req: EmailRequest):
    try:
        msg = EmailMessage()
        msg['Subject'] = 'Confirma tu cuenta'
        msg['From'] = os.getenv("EMAIL_FROM") or "no-reply@miapp.com"
        msg['To'] = req.email

        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        link = f"{frontend_url}/confirmar?token={req.token}"

          # Leer HTML desde archivo y reemplazar {{ link }}
        with open("templates/confirmation_email.html", "r", encoding="utf-8") as f:
            html_content = f.read().replace("{{ link }}", link)

        msg.set_content(f"Confirma tu cuenta aquí: {link}")  # Texto plano (fallback)
        msg.add_alternative(html_content, subtype="html")

        with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
            smtp.starttls()
            smtp.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))
            smtp.send_message(msg)
        return {"message": f"Correo enviado a {req.email}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al enviar email: {e}")
    
@app.post("/send-welcome/")
async def send_welcome(req: WelcomeRequest):
    try:
        msg = EmailMessage()
        msg['Subject'] = '¡Bienvenido a MiApp!'
        msg['From'] = os.getenv("EMAIL_FROM") or "no-reply@miapp.com"
        msg['To'] = req.email

       # Cargar plantilla HTML
        with open("templates/welcome_email.html", "r", encoding="utf-8") as f:
            html_content = f.read()

        msg.set_content("¡Tu cuenta ha sido verificada! Ya puedes disfrutar de CineManía.")  # fallback
        msg.add_alternative(html_content, subtype="html")

        with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
            smtp.starttls()
            smtp.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))
            smtp.send_message(msg)
        return {"message": f"Correo de bienvenida enviado a {req.email}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al enviar correo de bienvenida: {e}")
