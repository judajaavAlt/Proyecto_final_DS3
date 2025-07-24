import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.responses import JSONResponse
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
VERIFY_SERVICE_URL= os.getenv("VERIFY_SERVICE_URL")

# Endpoints individuales
USER_REGISTER_URL = f"{REGISTER_SERVICE_URL}/register/"
USER_DELETE_URL = f"{REGISTER_SERVICE_URL}/users/"
USER_VERIFY_URL = f"{VERIFY_SERVICE_URL}"
USER_LOGIN_URL = f"{LOGIN_SERVICE_URL}/login/"
USER_VERIFY_SESSION_URL = f"{LOGIN_SERVICE_URL}/verify-session/"

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
    
@app.get("/confirmar")
@app.get("/confirmar/")
async def saga_confirmar(token: str):
    print(f"Token recibido: {token}")

    async with httpx.AsyncClient() as client:
        r = await client.get(USER_VERIFY_URL, params={"token": token})
        if r.status_code != 200:
            print("Error en confirmación:", r.text)
            raise HTTPException(status_code=r.status_code, detail="no se pudo confirmar el usuario")

        data = r.json()
        email = data.get("email")
        if not email:
            raise HTTPException(status_code=500, detail="Usuario verificado, pero no se pudo obtener el email")

        resp = await client.post(EMAIL_WELCOME_URL, json={"email": email})
        if resp.status_code != 200:
            error_detail = await resp.text()
            print("Error enviando correo de bienvenida:", error_detail)
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

        # Lee el contenido JSON del backend
        data = r.json()
        # Crea una respuesta JSON igual a la original
        response = JSONResponse(content=data, status_code=r.status_code)
        
        # Si el backend devolvió set-cookie, añádelo aquí
        set_cookie = r.headers.get("set-cookie")
        if set_cookie:
            # Extrae solo el valor del token, puedes parsear si necesitas más seguridad
            # O simplemente pasa el header directamente:
            response.headers["set-cookie"] = set_cookie

        return response

@app.get("/verify-session/")
async def saga_verify_session(request: Request):
    cookie = request.headers.get("cookie")
    async with httpx.AsyncClient() as client:
        headers = {}
        if cookie:
            headers["cookie"] = cookie
        r = await client.get(USER_VERIFY_SESSION_URL, headers=headers)
        return JSONResponse(status_code=r.status_code, content=r.json())
