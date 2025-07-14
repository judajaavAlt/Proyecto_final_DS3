from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db_connection import Database
from pydantic import BaseModel

app = FastAPI()
db = Database()  # Singleton instance

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await db.get_pool()  # Initialize the pool on startup


@app.on_event("shutdown")
async def shutdown():
    if hasattr(db, '_pool'):
        await db._pool.close()  # Close pool on shutdown


class RegisterUser(BaseModel):
    username: str
    email: str
    password: str


@app.post("/register/")
async def register_user(user: RegisterUser):
    try:
        # Verificar si ya existe el usuario
        existing_user = await db.fetch("SELECT * FROM users WHERE email = $1", user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="El correo electrónico ya está registrado")

        # Insertar nuevo usuario con seguridad anti SQL-injection
        await db.execute(
            """
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, crypt($3, gen_salt('bf')))
            """,
            user.username,
            user.email,
            user.password,
        )
        return {"message": "Usuario creado exitosamente"}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/users/")
async def get_users():
    try:
        users = await db.fetch("SELECT id, username, email FROM users")
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))