"""seed cal poly slo campus

Revision ID: fed2b9f04a50
Revises: fdd39a744372
Create Date: 2026-11-15 23:40:12.883682

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fed2b9f04a50'
down_revision: Union[str, Sequence[str], None] = 'fdd39a744372'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


campus_table = sa.table("campus", sa.column("campus", sa.String))


def upgrade() -> None:
    """Upgrade schema."""
    op.bulk_insert(campus_table, [{"campus": "Cal Poly SLO"}])


def downgrade() -> None:
    """Downgrade schema."""
    op.execute(campus_table.delete().where(campus_table.c.campus == "Cal Poly SLO"))
