from pydantic import BaseModel

from enum import StrEnum


class Role(StrEnum):
    STUDENT = "STUDENT"
    LANDLORD = "LANDLORD"
    REALTOR = "REALTOR"


class TokenData(BaseModel):
    sub: int
    role: Role


class UserCredInDB(BaseModel):
    user_id: int
    username: str
    hashed_password: str
    role: Role


class LoginCreds(BaseModel):
    email: str
    password: str


#
class NewUser(BaseModel):
    name: str
    email: str
    password: str
    role: Role


class User(BaseModel):
    id: int
    name: str
    email: str
    role: Role


class Token(BaseModel):
    access_token: str
    token_type: str
