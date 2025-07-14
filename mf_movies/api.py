from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from db_connection import Database
from pydantic import BaseModel
from fastapi import Request  # Asegúrate de importar Request

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


@app.get("/")
async def root():
    return {"message": "API de películas en funcionamiento 🎥"}
    

@app.get('/movies')
async def get_movies(request: Request):
    try:
        result = await db.fetch("SELECT * FROM movies;")
        movies = [dict(movie) for movie in result]
        return JSONResponse(movies, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))