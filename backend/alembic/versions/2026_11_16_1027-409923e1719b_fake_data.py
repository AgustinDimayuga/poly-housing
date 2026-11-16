"""Fake_Data

Revision ID: 409923e1719b
Revises: fed2b9f04a50
Create Date: 2026-11-16 10:27:26.318357

"""

from typing import Sequence, Union

import json
from alembic import op
import sqlalchemy as sa
from datetime import date, datetime

# revision identifiers, used by Alembic.
revision: str = "409923e1719b"
down_revision: Union[str, Sequence[str], None] = "fed2b9f04a50"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


POSTER_ID = 6
CAMPUS_ID = 2
LISTING_TYPE = "RENT"
LISTING_STATUS = "SHOWING"

# NOTE: "type", "status" and "amenities" are intentionally left untyped.
# That way SQLAlchemy doesn't add a ::VARCHAR / ::JSON cast, and Postgres
# converts the plain string to the real column type (enum, json or jsonb).
listing = sa.table(
    "listing",
    sa.column("id", sa.Integer),
    sa.column("poster_id", sa.Integer),
    sa.column("campus", sa.Integer),
    sa.column("city", sa.String),
    sa.column("type"),
    sa.column("bedroom", sa.Integer),
    sa.column("bathroom", sa.Integer),
    sa.column("square_ft", sa.Integer),
    sa.column("price_monthly", sa.Integer),
    sa.column("available_from", sa.Date),
    sa.column("available_to", sa.Date),
    sa.column("status"),
    sa.column("address", sa.String),
    sa.column("description", sa.String),
    sa.column("amenities"),
    sa.column("posted_at", sa.DateTime),
)

realtor_details = sa.table(
    "realtor_listing_details",
    sa.column("listing_id", sa.Integer),
    sa.column("lease_term_mo", sa.Integer),
    sa.column("security_deposit", sa.Integer),
    sa.column("application_fee", sa.Integer),
)

# (city, address, bed, bath, sqft, price, lease_term_mo, description, amenities)
LISTINGS = [
    (
        "San Luis Obispo",
        "1234 Foothill Blvd, San Luis Obispo, CA 93405",
        2,
        1,
        850,
        2400,
        12,
        "Bright 2BR near campus with updated kitchen and private patio.",
        ["Wi-Fi", "Parking", "Washer/Dryer"],
    ),
    (
        "San Luis Obispo",
        "567 Higuera St, San Luis Obispo, CA 93401",
        1,
        1,
        600,
        1900,
        12,
        "Cozy downtown studio-style 1BR, walkable to shops and the farmers market.",
        ["Wi-Fi", "Air Conditioning"],
    ),
    (
        "San Luis Obispo",
        "890 Mill St, San Luis Obispo, CA 93401",
        3,
        2,
        1200,
        3600,
        12,
        "Spacious 3BR house with a large backyard, great for roommates.",
        ["Parking", "Washer/Dryer", "Pet Friendly", "Backyard"],
    ),
    (
        "Morro Bay",
        "210 Morro Bay Blvd, Morro Bay, CA 93442",
        2,
        1,
        900,
        2600,
        12,
        "Charming 2BR a few blocks from the Embarcadero with bay views.",
        ["Wi-Fi", "Parking", "Ocean View"],
    ),
    (
        "Morro Bay",
        "445 Harbor St, Morro Bay, CA 93442",
        1,
        1,
        650,
        2100,
        6,
        "Quiet 1BR near the harbor, perfect for a single tenant.",
        ["Wi-Fi", "Laundry On-Site"],
    ),
    (
        "Atascadero",
        "7890 El Camino Real, Atascadero, CA 93422",
        3,
        2,
        1400,
        2900,
        12,
        "Roomy 3BR 2BA home with a big yard and plenty of storage.",
        ["Parking", "Washer/Dryer", "Pet Friendly", "Backyard"],
    ),
    (
        "Atascadero",
        "3321 Traffic Way, Atascadero, CA 93422",
        2,
        1,
        950,
        2200,
        12,
        "Updated 2BR apartment close to Atascadero Lake Park.",
        ["Wi-Fi", "Air Conditioning", "Parking"],
    ),
    (
        "Pismo Beach",
        "101 Shell Beach Rd, Pismo Beach, CA 93449",
        2,
        2,
        1000,
        3200,
        12,
        "Beach-close 2BR 2BA with a sunny balcony.",
        ["Wi-Fi", "Parking", "Balcony", "Ocean View"],
    ),
    (
        "Pismo Beach",
        "782 Price St, Pismo Beach, CA 93449",
        1,
        1,
        700,
        2300,
        6,
        "Compact 1BR steps from the pier and downtown Pismo.",
        ["Wi-Fi", "Laundry On-Site"],
    ),
    (
        "Pismo Beach",
        "55 Ocean View Ave, Pismo Beach, CA 93449",
        4,
        3,
        1800,
        4800,
        12,
        "Large 4BR beach house, ideal for a group of students.",
        ["Parking", "Washer/Dryer", "Patio", "Pet Friendly"],
    ),
    (
        "Nipomo",
        "620 Tefft St, Nipomo, CA 93444",
        3,
        2,
        1300,
        2800,
        12,
        "Newer 3BR 2BA home in a quiet neighborhood with a two-car garage.",
        ["Parking", "Washer/Dryer", "Backyard"],
    ),
    (
        "Nipomo",
        "1480 W Tefft St, Nipomo, CA 93444",
        2,
        1,
        880,
        2100,
        12,
        "Affordable 2BR with a fenced yard, close to shopping.",
        ["Wi-Fi", "Pet Friendly", "Parking"],
    ),
]


def upgrade() -> None:
    """Upgrade schema."""
    conn = op.get_bind()

    for i, (city, address, bed, bath, sqft, price, term, desc, amenities) in enumerate(
        LISTINGS
    ):
        listing_id = conn.execute(
            sa.insert(listing)
            .values(
                poster_id=POSTER_ID,
                campus=CAMPUS_ID,
                city=city,
                type=LISTING_TYPE,
                bedroom=bed,
                bathroom=bath,
                square_ft=sqft,
                price_monthly=price,
                available_from=date(2027, 1 + (i % 6), 1),
                available_to=date(2028, 1 + (i % 6), 1),
                status=LISTING_STATUS,
                address=address,
                description=desc,
                amenities=json.dumps(amenities),
                posted_at=datetime(2026, 11, 16, 10, i),
            )
            .returning(listing.c.id)
        ).scalar_one()

        # RENT listings are realtor listings, so add their detail row too
        conn.execute(
            sa.insert(realtor_details).values(
                listing_id=listing_id,
                lease_term_mo=term,
                security_deposit=price,
                application_fee=50 if i % 2 == 0 else 45,
            )
        )


def downgrade() -> None:
    """Downgrade schema."""
    conn = op.get_bind()
    addresses = [row[1] for row in LISTINGS]

    ids = [
        r[0]
        for r in conn.execute(
            sa.select(listing.c.id).where(listing.c.address.in_(addresses))
        )
    ]
    if ids:
        conn.execute(
            sa.delete(realtor_details).where(realtor_details.c.listing_id.in_(ids))
        )
        conn.execute(sa.delete(listing).where(listing.c.id.in_(ids)))
