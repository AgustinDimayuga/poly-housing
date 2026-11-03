from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.engine import create
from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, Field
import sqlalchemy
from app import db
from app.model import User
from app.user_helper import *

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/me", response_model=User)
async def read_users_me(
    current_token_data: Annotated[TokenData, Depends(get_token_data)],
):
    with db.engine.begin() as connection:
        user = connection.execute(
            sqlalchemy.text("""
                SELECT name, email, role
                FROM users
                WHERE id = :user_id
                """),
            {"user_id": current_token_data.sub},
        ).one_or_none()
        if not user:
            raise HTTPException(status_code=404, detail="Could not fine user")
        return User(
            id=current_token_data.sub, name=user.name, email=user.email, role=user.role
        )
