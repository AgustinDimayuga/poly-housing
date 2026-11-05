from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, Field
import sqlalchemy
from app import db

router = APIRouter(prefix="/listings", tags=["listings"])


class Listing(BaseModel):
    id: int
    posterId: int
    campus: str
    city: str
    type: str
    bedroom: int
    bathroom: int
    square_ft: int
    monthly_price: int
    available_from: str
    available_to: str
    status: str
    address: str
    description: str
    amenities: str


class NewListing(BaseModel):
    posterId: int
    campus: str
    city: str
    type: str
    bedroom: int
    bathroom: int
    square_ft: int
    monthly_price: int
    available_from: str
    available_to: str
    status: str
    address: str
    description: str
    amenities: str


# class NewListing(BaseModel):
#     userId: int
#     address: str


""" Should we lowercase the campus names to avoid databse query errors?"""


@router.post("/", response_model=Listing)
def create_listing(listing: NewListing):
    with db.engine.begin() as connection:
        campus = connection.execute(
            sqlalchemy.text("""
                SELECT id
                FROM campus
                WHERE campus.campus = :name
                """),
            {"name": listing.campus},
        ).scalar_one_or_none()

        if campus is None:
            raise HTTPException(status_code=404, detail="Campus not found in database")

        listing_id = connection.execute(
            sqlalchemy.text("""
                    INSERT INTO listing (poster_id, campus, city, type, bedroom, bathroom, square_ft,
                    price_monthly, available_from, available_to, status, address, description, amenities)
                    VALUES
                """),
            [{"poster_id": listing.posterId, "campus": campus, "city": listing}],
        )


@router.get("/{listing_id}", response_model=Listing)
def get_listing(listing_id: int):
    with db.engine.begin() as connection:
        listing = connection.execute(
            sqlalchemy.text("""
                SELECT *
                from listing
                WHERE id = :listing_id
                """),
            [{"listing_id": listing_id}],
        ).one()

        return Listing(id=listing.id)
