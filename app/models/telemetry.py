"""
NyaySetu — Telemetry Model (Anonymized Pilot Metrics)
- Stores ONLY anonymized, aggregate data for Criterion 4 proof
- No PII: no names, no Aadhaar, no phone numbers, no raw documents
- Used for the field pilot dashboard
"""

from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class TelemetryEvent(Base):
    __tablename__ = "telemetry_events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    # ── Anonymized metrics ──
    session_id: Mapped[str] = mapped_column(
        String(64), nullable=False, index=True
    )  # Random hash, not user ID
    document_type: Mapped[str] = mapped_column(String(100), nullable=False)
    language: Mapped[str] = mapped_column(String(10), nullable=False)

    # ── Triage performance ──
    triage_duration_seconds: Mapped[float] = mapped_column(Float, nullable=False)
    routing_decision: Mapped[str] = mapped_column(
        String(50), nullable=False
    )  # lok_adalat, legal_aid, regular_court, etc.

    # ── Comprehension scores (before/after) ──
    comprehension_pre: Mapped[int | None] = mapped_column(Integer, nullable=True)  # 1-5
    comprehension_post: Mapped[int | None] = mapped_column(Integer, nullable=True)  # 1-5

    # ── Timestamp ──
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    def __repr__(self) -> str:
        return f"<Telemetry session={self.session_id} type={self.document_type}>"
