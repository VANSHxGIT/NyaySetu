"""
NyaySetu — Telemetry CRUD Operations
- Stores ONLY anonymized metrics (no PII)
- Used for Criterion 4 (Proven Impact) dashboard
"""

import secrets
from typing import Any, Optional

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.telemetry import TelemetryEvent


async def log_telemetry_event(
    db: AsyncSession,
    document_type: str,
    language: str,
    triage_duration_seconds: float,
    routing_decision: str,
    comprehension_pre: Optional[int] = None,
    comprehension_post: Optional[int] = None,
) -> TelemetryEvent:
    """Log an anonymized triage event."""
    event = TelemetryEvent(
        session_id=secrets.token_hex(32),  # Random, not user ID
        document_type=document_type,
        language=language,
        triage_duration_seconds=triage_duration_seconds,
        routing_decision=routing_decision,
        comprehension_pre=comprehension_pre,
        comprehension_post=comprehension_post,
    )
    db.add(event)
    await db.flush()
    return event


async def get_telemetry_summary(db: AsyncSession) -> dict[str, Any]:
    """Aggregate pilot metrics for the dashboard."""
    total = await db.execute(select(func.count(TelemetryEvent.id)))
    total_count = total.scalar_one()

    if total_count == 0:
        return {
            "total_cases_triaged": 0,
            "median_triage_time_seconds": 0.0,
            "avg_comprehension_pre": 0.0,
            "avg_comprehension_post": 0.0,
            "pct_routed_lok_adalat": 0.0,
            "pct_eligible_legal_aid": 0.0,
        }

    avg_time = await db.execute(
        select(func.avg(TelemetryEvent.triage_duration_seconds))
    )
    avg_pre = await db.execute(
        select(func.avg(TelemetryEvent.comprehension_pre))
    )
    avg_post = await db.execute(
        select(func.avg(TelemetryEvent.comprehension_post))
    )
    lok_adalat_count = await db.execute(
        select(func.count(TelemetryEvent.id)).where(
            TelemetryEvent.routing_decision == "lok_adalat"
        )
    )
    legal_aid_count = await db.execute(
        select(func.count(TelemetryEvent.id)).where(
            TelemetryEvent.routing_decision == "legal_aid"
        )
    )

    avg_time_val = avg_time.scalar_one() or 0.0
    avg_pre_val = avg_pre.scalar_one() or 0.0
    avg_post_val = avg_post.scalar_one() or 0.0

    return {
        "total_cases_triaged": total_count,
        "median_triage_time_seconds": round(float(avg_time_val), 2),
        "avg_comprehension_pre": round(float(avg_pre_val), 2),
        "avg_comprehension_post": round(float(avg_post_val), 2),
        "pct_routed_lok_adalat": round(
            (lok_adalat_count.scalar_one() / total_count) * 100, 1
        ),
        "pct_eligible_legal_aid": round(
            (legal_aid_count.scalar_one() / total_count) * 100, 1
        ),
    }
