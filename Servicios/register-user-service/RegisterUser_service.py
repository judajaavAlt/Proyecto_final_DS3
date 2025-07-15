from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db_connection import Database
from pydantic import BaseModel
import uuid

app = FastAPI()
db = Database()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializa el pool de conexión al iniciar la app
@app.on_event("startup")
async def startup():
    await db.get_pool()

# Cierra el pool al apagar la app
@app.on_event("shutdown")
async def shutdown():
    if hasattr(db, '_pool'):
        await db._pool.close()

# Modelo de datos para registrar un usuario
class RegisterUser(BaseModel):
    username: str
    email: str
    password: str

# Endpoint para registrar un nuevo usuario
@app.post("/register/")
async def register_user(user: RegisterUser):
    try:
        existing_user = await db.fetch("SELECT * FROM users WHERE email = $1", user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="El correo ya está registrado")

        token = str(uuid.uuid4())
        await db.execute(
            """
            INSERT INTO users (username, email, password, is_verified, verification_token)
            VALUES ($1, $2, crypt($3, gen_salt('bf')), FALSE, $4)
            """,
            user.username,
            user.email,
            user.password,
            token
        )
        return {
            "message": "Usuario creado.",
            "email": user.email,
            "token": token
        }
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint para confirmar un usuario por token
@app.get("/confirmar")
async def confirmar_usuario(token: str):
    user = await db.fetch("SELECT * FROM users WHERE verification_token = $1", token)
    if not user:
        raise HTTPException(status_code=400, detail="Token inválido o expirado")

    await db.execute("""
        UPDATE users
        SET is_verified = TRUE, verification_token = NULL
        WHERE verification_token = $1
    """, token)

    return {
        "message": "Cuenta verificada correctamente",
        "email": user[0]['email']
    }

# Endpoint de rollback para la saga orchestrator
@app.delete("/users/{email}")
async def rollback_delete_user(email: str):
    try:
        result = await db.execute("DELETE FROM users WHERE email = $1", email)
        return {"message": f"Usuario con email {email} eliminado (rollback)", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
