from fastapi import APIRouter, status
from pydantic import BaseModel, Field
import sqlalchemy
from app import db

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

#will need to update this
class User(BaseModel):
    name: str
    email: str
    role: str



@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
def post_user(user: User):
    with db.engine.begin() as connection:
        connection.execute(
            sqlalchemy.text(
            """
            INSERT INTO users (role, email, name)
            VALUES (:role, :email, :name)
            """),
            [{"role": user.role, "email": user.email, "name": user.name}])


    return user




