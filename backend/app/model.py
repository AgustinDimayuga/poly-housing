from pydantic import BaseModel


class TokenData(BaseModel):
    sub: int
    name: str


class UserCredInDB(BaseModel):
    user_id: int
    username: str
    hashed_password: str
    role: str


class LoginCreds(BaseModel):
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
