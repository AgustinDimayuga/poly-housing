from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, Field
import sqlalchemy
from app import db

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

#basic creds for now until we implement jwts
class LoginCreds(BaseModel):
    #currently in the user_cred table, it is listed as username instead of email, idk if we are using usernames or not
    email: str
    password: str

#
class NewUser(BaseModel):
    name: str
    email: str
    #phone: str
    password: str
    role: str

class User(BaseModel):
    id: int
    name: str
    email: str
    #phone: int
    role: str


@router.post("/", response_model=NewUser, status_code=status.HTTP_201_CREATED)
def post_user(user: NewUser):
    # try blocks copied from a prev project, so double check if there is a better way
    try:
        with db.engine.begin() as connection:
            user_id = connection.execute(
                sqlalchemy.text(
                """
                INSERT INTO users (role, email, name)
                VALUES (:role, :email, :name)
                RETURNING id
                """),
                [{"role": user.role, "email": user.email, "name": user.name}]).scalar_one()

            connection.execute(
                sqlalchemy.text(
                    """
                    INSERT INTO user_cred (user_id, username, password)
                    VALUES (:user_id, :username, :password)
                    """
                ),
                [{"user_id": user_id, "username": user.email, "password": user.password}]
            )

        return user
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already exists",
        )


@router.get("/{user_id}", response_model=User)
def get_user(user_id: int):
    pass


#this needs to be updated to work with JWTs
@router.post("/auth")
def get_creds(user: LoginCreds):
    email = user.email
    password = user.password

    with db.engine.begin() as connection:
        creds = connection.execute(
            sqlalchemy.text(
                """
                SELECT username, password
                FROM user_cred
                WHERE username = :username
                """
            ),
            [{"username": email}]
        ).one()

        if creds.password != password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password"
            )

        return "success"


