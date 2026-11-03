from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.engine import create
from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, Field
import sqlalchemy
from app import db
from app.user_helper import *

router = APIRouter(prefix="/auth", tags=["auth"])


# basic creds for now until we implement jwts
class LoginCreds(BaseModel):
    # currently in the user_cred table, it is listed as username instead of email, idk if we are using usernames or not
    email: str
    password: str


#
class NewUser(BaseModel):
    name: str
    email: str
    password: str
    role: str


class User(BaseModel):
    id: int
    name: str
    email: str
    role: str


class Token(BaseModel):
    access_token: str
    token_type: str


@router.post("/users", response_model=Token, status_code=status.HTTP_201_CREATED)
def create_user(user: NewUser):
    with db.engine.begin() as connection:
        user.email = user.email.strip().lower()
        user.name = user.name.strip().lower()
        hashed_password = get_password_hash(user.password)
        user_id = connection.execute(
            sqlalchemy.text("""
                INSERT INTO users (role, email, name)
                VALUES (:role, :email, :name)
                RETURNING id
                """),
            [
                {
                    "role": user.role,
                    "email": user.email,
                    "name": user.name,
                }
            ],
        ).scalar_one_or_none()

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User with provided email already exists",
            )

        connection.execute(
            sqlalchemy.text("""
                    INSERT INTO user_cred (user_id, password)
                    VALUES (:user_id, :password)
                    """),
            [
                {
                    "user_id": user_id,
                    "password": hashed_password,
                }
            ],
        )
        signed_token = create_access_token(
            {
                "sub": user_id,
                "role": user.role,
            }
        )
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

    signed_token = create_access_token(
        {
            "sub": user.user_id,
            "role": user.role,
        }
    )
    return Token(access_token=signed_token, token_type="bearer")
