from pydantic import BaseModel, Field

from enum import StrEnum
from typing import Annotated, Literal, Union


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


class User(BaseModel):
    id: int
    name: str
    email: str
    role: Role


class Token(BaseModel):
    access_token: str
    token_type: str


# add support for roles
# from typing import Annotated, Literal, Union


class BaseSignup(BaseModel):
    name: str
    email: str
    password: str


class StudentSignup(BaseSignup):
    role: Literal[Role.STUDENT]
    grad_year: int
    campus_id: int


class RealtorSignup(BaseSignup):
    role: Literal[Role.REALTOR]
    license_num: str
    license_state: str
    bio: str | None = None
    office_location: str | None = None


class LandlordSignup(BaseSignup):
    role: Literal[Role.LANDLORD]


NewUser = Annotated[
    Union[StudentSignup, RealtorSignup, LandlordSignup],
    Field(discriminator="role"),
]
