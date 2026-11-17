"""update reviews table

Revision ID: 1b2f9fa3d853
Revises: fed2b9f04a50
Create Date: 2026-11-15 16:38:56.900673

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "1b2f9fa3d853"
down_revision: Union[str, Sequence[str], None] = "fed2b9f04a50"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.drop_constraint("ck_reviews_stars_range", "reviews", type_="check")
    op.drop_column("reviews", "stars")
    op.drop_column("reviews", "text")

    op.add_column("reviews", sa.Column("move_in", sa.Date, nullable=True))
    op.add_column("reviews", sa.Column("move_out", sa.Date, nullable=True))
    op.add_column("reviews", sa.Column("arrangement", sa.String, nullable=False))
    op.add_column("reviews", sa.Column("rent", sa.Integer, nullable=False))
    op.add_column("reviews", sa.Column("overall_rating", sa.Integer, nullable=False))
    op.add_column("reviews", sa.Column("condition_rating", sa.Integer, nullable=False))
    op.add_column("reviews", sa.Column("landlord_rating", sa.Integer, nullable=False))
    op.add_column("reviews", sa.Column("maintenance_rating", sa.Integer, nullable=False))
    op.add_column("reviews", sa.Column("title", sa.String, nullable=False))
    op.add_column("reviews", sa.Column("review", sa.String, nullable=False))
    op.add_column("reviews", sa.Column("budget", sa.String, nullable=True))
    op.add_column("reviews", sa.Column("advice", sa.String, nullable=True))
    op.add_column("reviews", sa.Column("display_name", sa.String, nullable=True))


def downgrade() -> None:
    """Downgrade schema."""

    op.add_column("reviews", sa.Column("stars", sa.SmallInteger, nullable=False))
    op.add_column("reviews", sa.Column("text", sa.String, nullable=True))
    op.create_check_constraint("ck_reviews_stars_range", "reviews", "stars >= 1 AND stars <= 5")

    op.drop_column("reviews", "move_in")
    op.drop_column("reviews", "move_out")
    op.drop_column("reviews", "arrangement")
    op.drop_column("reviews", "rent")
    op.drop_column("reviews", "overall_rating")
    op.drop_column("reviews", "condition_rating")
    op.drop_column("reviews", "landlord_rating")
    op.drop_column("reviews", "maintenance_rating")
    op.drop_column("reviews", "title")
    op.drop_column("reviews", "review")
    op.drop_column("reviews", "budget")
    op.drop_column("reviews", "advice")
    op.drop_column("reviews", "display_name")
