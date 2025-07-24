from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from db_connection import Database
import jwt
import datetime
import os
from dotenv import load_dotenv

# Cargar las variables de entorno del archivo .env
load_dotenv()

app = FastAPI()
db = Database()

SECRET_KEY = os.getenv("JWT_SECRET")
if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET no está definido en el archivo .env")
ALGORITHM = "HS256"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000"],  # Cambia aquí si tu frontend está en otro puerto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await db.get_pool()

@app.on_event("shutdown")
async def shutdown():
    if hasattr(db, '_pool'):
        await db._pool.close()

class LoginUser(BaseModel):
    email_or_username: str
    password: str

@app.post("/login/")
async def login_user(user: LoginUser):
    try:
        # Permite login por email o username
        result = await db.fetch(
            """
            SELECT id, username, email 
            FROM users 
            WHERE (email = $1 OR username = $1)
              AND password = crypt($2, password)
              AND is_verified = TRUE
            """,
            user.email_or_username,
            user.password
        )

        if not result:
            raise HTTPException(status_code=401, detail="Credenciales inválidas o usuario no verificado")
        
        user_data = dict(result[0])
        payload = {
            "user_id": user_data["id"],
            "username": user_data["username"],
            "email": user_data["email"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

        # --- ¡La respuesta debe ser un JSONResponse para setear la cookie! ---
        response = JSONResponse(
            content={
                "message": "Inicio de sesión exitoso",
                "token": token,
                "user": {
                    "id": user_data["id"],
                    "username": user_data["username"],
                    "email": user_data["email"]
                }
            }
        )
        response.set_cookie(
            key="session",
            value=token,
            httponly=False,         # True para mayor seguridad (y no accesible en JS)
            samesite="Lax",
            path="/",
            secure=False,           # True en producción con HTTPS
            max_age=60 * 60 * 12
        )

        return response

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/verify-session/")
async def verify_session(request: Request):
    session_cookie = request.cookies.get("session")
    if not session_cookie:
        raise HTTPException(status_code=401, detail="No session cookie")
    try:
        payload = jwt.decode(session_cookie, SECRET_KEY, algorithms=[ALGORITHM])
        return {
            "username": payload["username"],
            "email": payload["email"]
        }
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid session")
