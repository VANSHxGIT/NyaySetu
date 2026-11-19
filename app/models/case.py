"""
NyaySetu — Case Model
- Each case belongs to a specific user (user_id FK)
- Stores triage results, routing decisions, and generated outputs
- No raw PII — Aadhaar, PAN, phone numbers are masked by Agent 1
"""

from datetime import datetime
from typing import Any, Optional

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func, JSON
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

JSONType = JSON().with_variant(JSONB, "postgresql")


class Case(Base):
    __tablename__ = "cases"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    case_ref: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False, index=True
    )  # e.g. "anon_8f2a9c"

    # ── Document info ──
    document_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    language: Mapped[str] = mapped_column(String(10), default="hi")
    status: Mapped[str] = mapped_column(
        String(30), default="pending"
    )  # pending, processing, completed, failed

    # ── Extracted data (JSON) ──
    extraction: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONType, nullable=True)
    routing: Mapped[Optional[dict[str, Any]]] = mapped_column(JSONType, nullable=True)

    # ── Generated outputs ──
    citizen_summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    paralegal_brief: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    missing_documents: Mapped[Optional[list[Any]]] = mapped_column(JSONType, nullable=True)

    # ── Timestamps ──
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # ── Relationships ──
    user = relationship("User", back_populates="cases")

    def __repr__(self) -> str:
        return f"<Case id={self.id} ref={self.case_ref} status={self.status}>"
