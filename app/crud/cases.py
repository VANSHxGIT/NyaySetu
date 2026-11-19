"""
NyaySetu — Case CRUD Operations
- EVERY query filters by user_id (from JWT, never from URL)
- No endpoint exposes another user's data
- Admin can access any case via separate admin endpoints
"""

import secrets
from typing import Any, Optional

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.case import Case


def _generate_case_ref() -> str:
    """Generate a unique anonymized case reference."""
    return f"anon_{secrets.token_hex(6)}"


async def create_case(
    db: AsyncSession,
    user_id: int,
    language: str = "hi",
) -> Case:
    """Create a new case for a specific user."""
    case = Case(
        user_id=user_id,
        case_ref=_generate_case_ref(),
        language=language,
        status="pending",
    )
    db.add(case)
    await db.flush()
    await db.refresh(case)
    return case


async def get_user_cases(
    db: AsyncSession,
    user_id: int,
    page: int = 1,
    per_page: int = 20,
) -> tuple[list[Case], int]:
    """
    Get cases for a specific user ONLY.
    user_id comes from the JWT token, never from the request.
    """
    count_result = await db.execute(
        select(func.count(Case.id)).where(Case.user_id == user_id)
    )
    total = count_result.scalar_one()

    result = await db.execute(
        select(Case)
        .where(Case.user_id == user_id)
        .order_by(Case.created_at.desc())
        .offset((page - 1) * per_page)
        .limit(per_page)
    )
    cases = list(result.scalars().all())
    return cases, total


async def get_case_by_ref(
    db: AsyncSession, case_ref: str, user_id: int
) -> Optional[Case]:
    """
    Get a single case by reference — MUST belong to the requesting user.
    """
    result = await db.execute(
        select(Case).where(Case.case_ref == case_ref, Case.user_id == user_id)
    )
    return result.scalar_one_or_none()


async def update_case_triage(
    db: AsyncSession,
    case: Case,
    document_type: str,
    extraction: dict[str, Any],
    routing: dict[str, Any],
    citizen_summary: str,
    paralegal_brief: str,
    missing_documents: list[Any],
) -> Case:
    """Update a case with triage results from the agent pipeline."""
    case.document_type = document_type
    case.extraction = extraction
    case.routing = routing
    case.citizen_summary = citizen_summary
    case.paralegal_brief = paralegal_brief
    case.missing_documents = missing_documents
    case.status = "completed"
    await db.flush()
    await db.refresh(case)
    return case
