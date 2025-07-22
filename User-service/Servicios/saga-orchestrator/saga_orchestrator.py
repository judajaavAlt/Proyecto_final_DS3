import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import httpx

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# URLs de servicios desde variables de entorno
REGISTER_SERVICE_URL = os.getenv("REGISTER_SERVICE_URL")
LOGIN_SERVICE_URL = os.getenv("LOGIN_SERVICE_URL")
EMAIL_SERVICE_URL = os.getenv("EMAIL_SERVICE_URL")

# Endpoints individuales
USER_REGISTER_URL = f"{REGISTER_SERVICE_URL}/register/"
USER_DELETE_URL = f"{REGISTER_SERVICE_URL}/users/"
USER_VERIFY_URL = f"{REGISTER_SERVICE_URL}/confirmar/"
USER_LOGIN_URL = f"{LOGIN_SERVICE_URL}/login/"

EMAIL_CONFIRM_URL = f"{EMAIL_SERVICE_URL}/send-confirmation/"
EMAIL_WELCOME_URL = f"{EMAIL_SERVICE_URL}/send-welcome/"

# Modelos de datos
class User(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginUser(BaseModel):
    email_or_username: str  # Puede ser email o username
    password: str

@app.post("/register/")
async def saga_register(user: User):
    async with httpx.AsyncClient() as client:
        # Paso 1: Registrar usuario
        r = await client.post(USER_REGISTER_URL, json=user.dict())
        if r.status_code != 200:
            print("Error en registro:", r.text)
            try:
                detail = r.json().get("detail", "No se pudo crear usuario")
            except Exception:
                detail = "No se pudo crear usuario"
            raise HTTPException(status_code=r.status_code, detail=detail)

        data = r.json()
        email = user.email
        token = data.get("token")
        if not token:
            raise HTTPException(status_code=500, detail="No se pudo obtener el token")

        # Paso 2: Enviar email de confirmación
        resp = await client.post(EMAIL_CONFIRM_URL, json={"email": email, "token": token})
        if resp.status_code != 200:
            # Compensación: eliminar usuario
            await client.delete(f"{USER_DELETE_URL}{email}")
            raise HTTPException(status_code=500, detail="No se pudo enviar email, registro revertido")

        return {"message": "Usuario creado y email enviado correctamente."}

@app.get("/confirmar/")
async def saga_confirmar(token: str):
    async with httpx.AsyncClient() as client:
        # Paso 1: Verificar usuario
        r = await client.get(USER_VERIFY_URL, params={"token": token})
        if r.status_code != 200:
            print("Error en confirmación:", r.text)
            raise HTTPException(status_code=400, detail="No se pudo verificar usuario")

        data = r.json()
        email = data.get("email")
        if not email:
            raise HTTPException(status_code=500, detail="Usuario verificado, pero no se pudo obtener el email")

        # Paso 2: Enviar email de bienvenida
        resp = await client.post(EMAIL_WELCOME_URL, json={"email": email})
        if resp.status_code != 200:
            print("Error enviando correo de bienvenida:", resp.text)
            return {"message": "Usuario verificado, pero no se pudo enviar el correo de bienvenida."}

        return {"message": "Cuenta verificada y correo de bienvenida enviado correctamente."}

@app.post("/login/")
async def saga_login(user: LoginUser):
    async with httpx.AsyncClient() as client:
        r = await client.post(USER_LOGIN_URL, json=user.dict())
        if r.status_code != 200:
            try:
                detail = r.json().get("detail", "No se pudo iniciar sesión")
            except Exception:
                detail = "No se pudo iniciar sesión"
            raise HTTPException(status_code=r.status_code, detail=detail)
        return r.json()
