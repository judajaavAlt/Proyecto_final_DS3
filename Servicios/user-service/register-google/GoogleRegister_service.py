from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from db_connection import Database

app = FastAPI()
db = Database()

class GoogleRegisterUser(BaseModel):
    username: str
    email: str

@app.post("/register/google/")
async def register_user_google(user: GoogleRegisterUser):
    try:
        existing_user = await db.fetch("SELECT * FROM users WHERE email = $1", user.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="El correo ya está registrado")

        # Aquí el usuario queda verificado automáticamente
        await db.execute(
            """
            INSERT INTO users (username, email, is_verified)
            VALUES ($1, $2, TRUE)
            """,
            user.username,
            user.email,
        )

        return {"message": "Usuario registrado por Google exitosamente."}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
