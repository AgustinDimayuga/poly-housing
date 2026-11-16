"""uppercase all enum values

Revision ID: fdd39a744372
Revises: 878dec3d8563
Create Date: 2026-11-03 12:05:46.953469

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "fdd39a744372"
down_revision: Union[str, Sequence[str], None] = "878dec3d8563"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


RENAMES: dict[str, list[tuple[str, str]]] = {
    "user_role": [
        ("LandLord", "LANDLORD"),
        ("Student", "STUDENT"),
        ("Realtor", "REALTOR"),
    ],
    "listing_type": [
        ("Sublease", "SUBLEASE"),
    ],
    "listing_status": [
        ("pending", "PENDING"),
        ("application", "APPLICATION"),
        ("showing", "SHOWING"),
    ],
    "unit_type": [
        ("private_room", "PRIVATE_ROOM"),
        ("shared_room", "SHARED_ROOM"),
        ("entire_unit", "ENTIRE_UNIT"),
    ],
}


def _rename_values(reverse: bool = False) -> None:
    for enum_name, pairs in RENAMES.items():
        for old, new in pairs:
            src, dst = (new, old) if reverse else (old, new)
            op.execute(f"ALTER TYPE {enum_name} RENAME VALUE '{src}' TO '{dst}'")


def upgrade() -> None:
    """Upgrade schema."""
    _rename_values()

    op.alter_column(
        "listing",
        "status",
        server_default=sa.text("'PENDING'::listing_status"),
    )


def downgrade() -> None:
    """Downgrade schema."""
    _rename_values(reverse=True)

    op.alter_column(
        "listing",
        "status",
        server_default=sa.text("'pending'::listing_status"),
    )
