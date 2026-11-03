from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.engine import create
from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, Field
import sqlalchemy
from app import db
from app.user_helper import *

from app.model import LoginCreds, NewUser, Token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/users", response_model=Token, status_code=status.HTTP_201_CREATED)
def create_user(user: NewUser):
    email = user.email.strip().lower()
    name = user.name.strip()
    hashed_password = get_password_hash(user.password)

    try:
        with db.engine.begin() as connection:
            user_id = connection.execute(
                sqlalchemy.text("""
                    INSERT INTO users (role, email, name)
                    VALUES (:role, :email, :name)
                    RETURNING id
                """),
                {"role": user.role.value, "email": email, "name": name},
            ).scalar_one()

            connection.execute(
                sqlalchemy.text("""
                    INSERT INTO user_cred (user_id, password)
                    VALUES (:user_id, :password)
                """),
                {"user_id": user_id, "password": hashed_password},
            )
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with that email already exists",
        )

    signed_token = create_access_token(user_id=user_id, role=user.role)
    return Token(access_token=signed_token, token_type="bearer")


@router.post("/tokens")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    with db.engine.begin() as connection:
        user = authenticate_user(
            connection,
            form_data.username,
            form_data.password,
        )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    signed_token = create_access_token(user_id=user.user_id, role=user.role)
    return Token(access_token=signed_token, token_type="bearer")
