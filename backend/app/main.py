from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users

from app.config import settings

app = FastAPI(title="Poly Housing API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = APIRouter(prefix="/api")
users = users.router


@api.get("/health", tags=["meta"])
def health():
    return {"status": "ok"}


app.include_router(api)
app.include_router(users)
