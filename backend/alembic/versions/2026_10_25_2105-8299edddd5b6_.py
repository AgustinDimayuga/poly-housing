"""empty message

Revision ID: 8299edddd5b6
Revises:
Create Date: 2026-10-25 21:05:34.074186

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "8299edddd5b6"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

user_role = sa.Enum("LandLord", "Student", "Realtor", name="user_role")
listing_type = sa.Enum("Sublease", "RENT", name="listing_type")
listing_status = sa.Enum("pending", "application", "showing", name="listing_status")
unit_type = sa.Enum("private_room", "shared_room", "entire_unit", name="unit_type")


def upgrade() -> None:
    """Upgrade schema."""

    op.create_table(
        "campus",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("campus", sa.String(), nullable=False, unique=True),
    )

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("role", user_role, nullable=False),
        sa.Column("email", sa.String(), nullable=False, unique=True),
        sa.Column(
            "created_at",
            sa.Date(),
            nullable=False,
            server_default=sa.func.current_date(),
        ),
        sa.Column("name", sa.String(), nullable=False),
    )

    op.create_table(
        "user_cred",
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            primary_key=True,
        ),
        sa.Column("username", sa.String(), nullable=False, unique=True),
        sa.Column("password", sa.String(), nullable=False),
    )

    op.create_table(
        "students",
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            primary_key=True,
        ),
        sa.Column("grad_year", sa.Integer(), nullable=False),
        sa.Column(
            "campus",
            sa.Integer(),
            sa.ForeignKey("campus.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column(
            "edu_email_verified", sa.Boolean(), nullable=False, server_default="false"
        ),
    )

    op.create_table(
        "realtors",
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            primary_key=True,
        ),
        sa.Column("license_num", sa.Integer(), nullable=False),
        sa.Column("verified", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("license_state", sa.String(length=2), nullable=False),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("office_location", sa.String(), nullable=True),
    )

    op.create_table(
        "reviews",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "realtor_id",
            sa.Integer(),
            sa.ForeignKey("realtors.user_id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("stars", sa.SmallInteger(), nullable=False),
        sa.Column("text", sa.Text(), nullable=True),
        sa.CheckConstraint("stars >= 1 AND stars <= 5", name="ck_reviews_stars_range"),
    )

    op.create_table(
        "listing",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "poster_id",
            sa.Integer(),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column(
            "campus",
            sa.Integer(),
            sa.ForeignKey("campus.id", ondelete="SET NULL"),
            nullable=True,
        ),
        sa.Column("city", sa.String(), nullable=False),
        sa.Column("type", listing_type, nullable=False),
        sa.Column("bedroom", sa.Integer(), nullable=False),
        sa.Column("bathroom", sa.Numeric(3, 1), nullable=False),
        sa.Column("square_ft", sa.Integer(), nullable=True),
        sa.Column("price_monthly", sa.Numeric(10, 2), nullable=False),
        sa.Column("available_from", sa.Date(), nullable=True),
        sa.Column("available_to", sa.Date(), nullable=True),
        sa.Column("status", listing_status, nullable=False, server_default="pending"),
        sa.Column("address", sa.Text(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("amenities", postgresql.JSONB(), nullable=True),
        sa.Column(
            "posted_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )

    op.create_table(
        "realtor_listing_details",
        sa.Column(
            "listing_id",
            sa.Integer(),
            sa.ForeignKey("listing.id", ondelete="CASCADE"),
            primary_key=True,
        ),
        sa.Column("lease_term_mo", sa.Integer(), nullable=False),
        sa.Column("security_deposit", sa.Numeric(10, 2), nullable=True),
        sa.Column("application_fee", sa.Numeric(10, 2), nullable=True),
    )

    op.create_table(
        "sublease_listing_detail",
        sa.Column(
            "listing_id",
            sa.Integer(),
            sa.ForeignKey("listing.id", ondelete="CASCADE"),
            primary_key=True,
        ),
        sa.Column("unit_type", unit_type, nullable=False),
        sa.Column(
            "roommates_remaining", sa.Integer(), nullable=False, server_default="0"
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_table("sublease_listing_detail")
    op.drop_table("realtor_listing_details")
    op.drop_table("listing")
    op.drop_table("reviews")
    op.drop_table("realtors")
    op.drop_table("students")
    op.drop_table("user_cred")
    op.drop_table("users")
    op.drop_table("campus")

    bind = op.get_bind()
    unit_type.drop(bind, checkfirst=True)
    listing_status.drop(bind, checkfirst=True)
    listing_type.drop(bind, checkfirst=True)
    user_role.drop(bind, checkfirst=True)
