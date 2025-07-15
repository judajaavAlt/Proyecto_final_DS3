from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
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

# URLs internas del docker-compose
USER_SERVICE_URL = "http://user-service:5000/register/"
EMAIL_SERVICE_URL = "http://email-service:5001/send-confirmation/"
DELETE_USER_URL = "http://user-service:5000/users/"  # Endpoint DELETE con {email}
VERIFY_USER_URL = "http://user-service:5000/confirmar"
WELCOME_EMAIL_URL = "http://email-service:5001/send-welcome/"

# Modelo de usuario
class User(BaseModel):
    username: str
    email: EmailStr
    password: str

@app.post("/saga/register/")
async def saga_register(user: User):
    async with httpx.AsyncClient() as client:
        # Paso 1: Registrar usuario
        r = await client.post(USER_SERVICE_URL, json=user.dict())
        if r.status_code != 200:
            print("Error en registro:", r.text)
            raise HTTPException(status_code=400, detail="No se pudo crear usuario")

        data = r.json()
        email = user.email
        token = data.get("token")
        if not token:
            raise HTTPException(status_code=500, detail="No se pudo obtener el token")

        # Paso 2: Enviar email de confirmación
        resp = await client.post(EMAIL_SERVICE_URL, json={"email": email, "token": token})
        if resp.status_code != 200:
            # Compensación: eliminar usuario
            await client.delete(f"{DELETE_USER_URL}{email}")
            raise HTTPException(status_code=500, detail="No se pudo enviar email, registro revertido")

        return {"message": "Usuario creado y email enviado correctamente."}

@app.get("/saga/confirmar/")
async def saga_confirmar(token: str):
    async with httpx.AsyncClient() as client:
        # Paso 1: Verificar usuario en user-service
        r = await client.get(VERIFY_USER_URL, params={"token": token})
        if r.status_code != 200:
            print("Error en confirmación:", r.text)
            raise HTTPException(status_code=400, detail="No se pudo verificar usuario")

        data = r.json()
        email = data.get("email")
        if not email:
            raise HTTPException(status_code=500, detail="Usuario verificado, pero no se pudo obtener el email")

        # Paso 2: Enviar email de bienvenida
        resp = await client.post(WELCOME_EMAIL_URL, json={"email": email})
        if resp.status_code != 200:
            print("Error enviando correo de bienvenida:", resp.text)
            return {"message": "Usuario verificado, pero no se pudo enviar el correo de bienvenida."}

        return {"message": "Cuenta verificada y correo de bienvenida enviado correctamente."}
