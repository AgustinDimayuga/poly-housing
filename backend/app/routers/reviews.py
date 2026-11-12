from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.exc import IntegrityError
import sqlalchemy
from app import db
from datetime import date, timedelta


router = APIRouter(prefix="/reviews", tags=["reviews"])

class Review(BaseModel):
    reviewerName: str
    moveIn: str
    moveOut: str
    # currentResident:
    arrangement: str
    rent: int
    overallRating: int
    condRating: int
    landlordRating: int
    maintRating: int
    title: str
    review: str
    budget: str
    advice: str
    displayName: str
    relationship: str

@router.post("/", response_model=Review, status_code=status.HTTP_201_CREATED)
def create_review(new_review: Review):

    with db.engine.begin() as connection:
        user_id = connection.execute(
            sqlalchemy.text(
                """
                SELECT id
                FROM users
                WHERE name = :name
                """
            ),
            [{"name": new_review.reviewerName}]
        ).scalar_one_or_none()

        if user_id is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="could not find user")


        try:
            review_id = connection.execute(
                sqlalchemy.text(
                    """
                    INSERT INTO reviews
                    (movein, moveout, arrangement, rent, overallRating, landlordRating, maintRating, title, review, budget, advice,
                    displayName, relationship)
                    VALUES (:movein, :moveout, :arrangement, :rent, :overallRating, :landlordRating, :title, :review, :budget, :advice,
                    :displayName, :relationship)
                    RETURNING ID
                    """
                )
            ).scalar_one()

        except IntegrityError:
            raise HTTPException(status_code=status.HTTP_418_IM_A_TEAPOT)


    print(new_review)

    return new_review

















