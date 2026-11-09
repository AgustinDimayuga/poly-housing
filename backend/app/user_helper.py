from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash
from sqlalchemy.sql.functions import user
from app.model import (
    LandlordSignup,
    RealtorSignup,
    Role,
    StudentSignup,
    TokenData,
    UserCredInDB,
)


from fastapi import Depends, HTTPException, status

import sqlalchemy

from app.config import settings

secret_key = settings.secret_key
algorithm = settings.algorithm


password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/tokens")

DUMMY_HASH = password_hash.hash("dummypassword")


def verify_password(plain_pass, hashed_password):
    return password_hash.verify(plain_pass, hashed_password)


def get_password_hash(password):
    return password_hash.hash(password)


def get_user_creds(connection: sqlalchemy.Connection, username: str) -> UserCredInDB:
    ## Implement getting user
    user = (
        connection.execute(
            sqlalchemy.text("""
    SELECT id, email, password, role
    FROM users
    JOIN user_cred ON user_id = id
    WHERE email = :username

    """),
            {"username": username},
        )
        .mappings()
        .one_or_none()
    )
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return UserCredInDB(
        user_id=user["id"],
        username=user["email"],
        hashed_password=user["password"],
        role=user["role"],
    )


def authenticate_user(connection: sqlalchemy.Connection, username: str, password: str):
    user = get_user_creds(connection, username)
    ## Protect Against time attacks
    if not user:
        verify_password(password, DUMMY_HASH)
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(
    user_id: int,
    role: Role,
    expires_delta: timedelta | None = None,
) -> str:
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=45))
    to_encode = {
        "sub": str(user_id),
        "role": role,
        "exp": expire,
    }
    return jwt.encode(to_encode, secret_key, algorithm=algorithm)


async def get_token_data(
    token: Annotated[str, Depends(oauth2_scheme)],
) -> TokenData:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, secret_key, algorithm)

        user_id = payload.get("sub")
        role = payload.get("role")
        if user_id is None or role is None:
            raise credentials_exception

    except InvalidTokenError as e:
        print("JWT error:", repr(e))
        raise credentials_exception

    return TokenData(sub=int(user_id), role=role)


def _create_student(conn, user_id: int, data: StudentSignup) -> None:
    conn.execute(
        sqlalchemy.text("""
            INSERT INTO students (user_id, grad_year, campus, edu_email_verified)
            VALUES (:user_id, :grad_year, :campus, FALSE)
        """),
        {"user_id": user_id, "grad_year": data.grad_year, "campus": data.campus_id},
    )


def _create_realtor(conn, user_id: int, data: RealtorSignup) -> None:
    conn.execute(
        sqlalchemy.text("""
            INSERT INTO realtors (user_id, license_num, verified, license_state, bio, office_location)
            VALUES (:user_id, :license_num, FALSE, :license_state, :bio, :office_location)
        """),
        {
            "user_id": user_id,
            "license_num": data.license_num,
            "license_state": data.license_state,
            "bio": data.bio,
            "office_location": data.office_location,
        },
    )


def _create_landlord(conn, user_id: int, data: LandlordSignup) -> None:
    pass  # no profile table yet


PROFILE_CREATORS = {
    Role.STUDENT: _create_student,
    Role.REALTOR: _create_realtor,
    Role.LANDLORD: _create_landlord,
}
