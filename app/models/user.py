"""
NyaySetu — User Model
- Stores hashed passwords only (never plaintext)
- Tracks failed login attempts for account lockout
- Role-based access: 'user' or 'admin'
"""

from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import Boolean, DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(
        String(255), unique=True, nullable=False, index=True
    )
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(
        String(20), nullable=False, default="user"
    )  # 'user' or 'admin'
    language: Mapped[str] = mapped_column(String(10), nullable=False, default="hi")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # ── Account lockout fields ──
    failed_login_attempts: Mapped[int] = mapped_column(Integer, default=0)
    locked_until: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    # ── Timestamps ──
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # ── Relationships ──
    cases = relationship("Case", back_populates="user", lazy="selectin")
    refresh_tokens = relationship(
        "RefreshToken", back_populates="user", lazy="selectin"
    )

    def is_locked(self) -> bool:
        """Check if account is currently locked out."""
        if self.locked_until is None:
            return False
        # Normalize to UTC comparison
        now = datetime.now(timezone.utc)
        target = self.locked_until
        if target.tzinfo is None:
            now = datetime.utcnow()
        return now < target

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email} role={self.role}>"
