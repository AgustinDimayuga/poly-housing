from sqlalchemy.exc import IntegrityError
from fastapi import APIRouter, status, HTTPException
from pydantic import BaseModel, Field
import sqlalchemy
from app import db
from sqlalchemy import JSON

from datetime import date

# from datetime import date (Talk to team about this)
router = APIRouter(prefix="/listings", tags=["listings"])


class Listing(BaseModel):
    id: int | None = None
    posterId: int
    campus: str
    city: str
    type: str
    bedroom: int
    bathroom: int
    square_ft: int
    monthly_price: int
    available_from: date
    available_to: date
    status: str
    address: str
    description: str
    amenities: list[str]


# class NewListing(BaseModel):
#     posterId: int
#     campus: str
#     city: str
#     type: str
#     bedroom: int
#     bathroom: int
#     square_ft: int
#     monthly_price: int
#     available_from: date
#     available_to: date
#     status: str
#     address: str
#     description: str
#     amenities: list[str]


# class NewListing(BaseModel):
#     userId: int
#     address: str


""" Should we lowercase the campus names to avoid databse query errors?"""


@router.post("/", response_model=Listing)
def create_listing(listing: Listing):

    if listing.bedroom <= 0:
        raise HTTPException(status_code=404, detail="invalid bedroom number")
    if listing.bathroom <= 0:
        raise HTTPException(status_code=404, detail="invalid bathroom number")
    if listing.square_ft <= 0:
        raise HTTPException(status_code=404, detail="invalid square footage")
    if listing.monthly_price < 0:
        raise HTTPException(status_code=404, detail="invalid monthly price")
    if listing.available_from <= listing.available_to:
        raise HTTPException(status_code=404, detail="invalid date range for listing")

    with db.engine.begin() as connection:
        campus = connection.execute(
            sqlalchemy.text("""
                SELECT id
                FROM campus
                WHERE campus.campus = :name
                """),
            {"name": listing.campus},
        ).scalar_one_or_none()

        poster_id = connection.execute(
            sqlalchemy.text("""
                SELECT id
                FROM users
                where users.id = :poster_id
                """),
            {"poster_id": listing.posterId},
        ).scalar_one_or_none()

        if poster_id is None:
            raise HTTPException(
                status_code=404, detail="Poster ID not found in database"
            )

        if campus is None:
            raise HTTPException(status_code=404, detail="Campus not found in database")

        listing_id = connection.execute(
            sqlalchemy.text("""
                    INSERT INTO listing (poster_id, campus, city, type, bedroom, bathroom, square_ft,
                    price_monthly, available_from, available_to, status, address, description, amenities)
                    VALUES (:poster_id, :campus, :city, :type, :bedroom, :bathroom, :square_ft,
                    :price_monthly, :available_from, :available_to, :status, :address, :description, :amenities)
                    RETURNING id
                """).bindparams(sqlalchemy.bindparam("amenities", type_=JSON)),
            {
                "poster_id": listing.posterId,
                "campus": campus,
                "city": listing.city,
                "type": listing.type,
                "bedroom": listing.bedroom,
                "bathroom": listing.bathroom,
                "square_ft": listing.square_ft,
                "price_monthly": listing.monthly_price,
                "available_from": listing.available_from,
                "available_to": listing.available_to,
                "status": listing.status,
                "address": listing.address,
                "description": listing.description,
                "amenities": listing.amenities,
            },
        ).scalar_one_or_none()
        return Listing(
            id=listing_id,
            posterId=listing.posterId,
            campus=listing.campus,
            city=listing.city,
            type=listing.type,
            bedroom=listing.bedroom,
            bathroom=listing.bathroom,
            square_ft=listing.square_ft,
            monthly_price=listing.monthly_price,
            available_from=listing.available_from,
            available_to=listing.available_to,
            status=listing.status,
            address=listing.address,
            description=listing.description,
            amenities=listing.amenities,
        )


@router.get("/all", response_model=list[Listing])
def get_listings():
    with db.engine.begin() as connection:
        listings = (
            connection.execute(
                sqlalchemy.text("""
                SELECT listing.*, campus.campus
                FROM listing
                JOIN Campus ON campus.id = listing.campus
                """)
            )
            .mappings()
            .all()
        )

        return [
            Listing(
                id=listing["id"],
                posterId=listing["poster_id"],
                campus=listing["campus"],
                city=listing["city"],
                type=listing["type"],
                bedroom=listing["bedroom"],
                bathroom=listing["bathroom"],
                square_ft=listing["square_ft"],
                monthly_price=listing["price_monthly"],
                available_from=listing["available_from"],
                available_to=listing["available_to"],
                status=listing["status"],
                address=listing["address"],
                description=listing["description"],
                amenities=listing["amenities"],
            )
            for listing in listings
        ]


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
        ).one_or_none()

        if listing is None:
            raise HTTPException(
                status_code=404, detail="Listing was not found in the Database"
            )

        return Listing(
            id=listing.id,
            posterId=listing.poster_id,
            campus=listing.campus,
            city=listing.city,
            type=listing.type,
            bedroom=listing.bedroom,
            bathroom=listing.bathroom,
            square_ft=listing.square_ft,
            monthly_price=listing.price_monthly,
            available_from=listing.available_from,
            available_to=listing.available_to,
            status=listing.status,
            address=listing.address,
            description=listing.description,
            amenities=listing.amenities,
        )


## quick revision will be needed to make sure it does'nt delete multiple rows when db heavily populated


@router.delete("/{listing_id}", response_model=Listing)
def delete_listing(listing_id: int):
    with db.engine.begin() as connection:
        listing = connection.execute(
            sqlalchemy.text(
                """
                DELETE FROM listing
                USING campus
                WHERE listing.id = :listing_id AND campus.id = listing.campus
                RETURNING * , campus.campus AS campus_name
                """
            ),
            {"listing_id": listing_id},
        ).one_or_none()

        if listing is None:
            raise HTTPException(
                status_code=404, detail="Listing was not found in database"
            )

        print(listing)
        return Listing(
            id=listing.id,
            posterId=listing.poster_id,
            campus=listing.campus_name,
            city=listing.city,
            type=listing.type,
            bedroom=listing.bedroom,
            bathroom=listing.bathroom,
            square_ft=listing.square_ft,
            monthly_price=listing.price_monthly,
            available_from=listing.available_from,
            available_to=listing.available_to,
            status=listing.status,
            address=listing.address,
            description=listing.description,
            amenities=listing.amenities,
        )
