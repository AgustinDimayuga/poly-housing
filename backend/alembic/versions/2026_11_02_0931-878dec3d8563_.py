"""empty message

Revision ID: 878dec3d8563
Revises: 8299edddd5b6
Create Date: 2026-11-02 09:31:29.458362

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "878dec3d8563"
down_revision: Union[str, Sequence[str], None] = "8299edddd5b6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.drop_column("user_cred", "username")
    pass


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column(
        "user_cred",
        sa.Column(
            "user_id",
            sa.Integer(),
            sa.ForeignKey("users.id", ondelete="CASCADE"),
            primary_key=True,
        ),
    )
    pass
