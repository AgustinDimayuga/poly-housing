from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.engine import create
from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, Field
import sqlalchemy
from app import db
from app.user_helper import *

router = APIRouter(prefix="/user", tags=["user"])



@router.get("/me/")
async def read_users_me(
    current_token_data: Annotated[TokenData, Depends(get_token_data)],
):
    with db.engine.begin() as connection:
