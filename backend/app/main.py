from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, user

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


@api.get("/health", tags=["meta"])
def health():
    return {"status": "ok"}


app.include_router(api)
app.include_router(auth.router)
app.include_router(user.router)
