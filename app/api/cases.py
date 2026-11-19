"""
NyaySetu — Case Endpoints (User-Scoped)
- GET /my/cases — list only the authenticated user's cases
- GET /my/cases/{case_ref} — view a single case (must belong to user)
- User ID always extracted from JWT, never from URL parameters
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.crud.cases import get_case_by_ref, get_user_cases
from app.models.user import User
from app.schemas.case import CaseListResponse, CaseResponse

router = APIRouter(prefix="/my", tags=["My Cases"])


@router.get("/cases", response_model=CaseListResponse)
async def list_my_cases(
    page: int = Query(1, ge=1, le=1000),
    per_page: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    List the authenticated user's cases only.
    user_id comes from the JWT token — not the URL.
    """
    cases, total = await get_user_cases(
        db, user_id=current_user.id, page=page, per_page=per_page
    )
    return CaseListResponse(
        cases=[CaseResponse.model_validate(c) for c in cases],
        total=total,
        page=page,
        per_page=per_page,
    )


@router.get("/cases/{case_ref}", response_model=CaseResponse)
async def get_my_case(
    case_ref: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Get a single case by reference.
    Returns 404 if the case doesn't exist OR doesn't belong to this user.
    (Intentionally vague to prevent enumeration attacks.)
    """
    case = await get_case_by_ref(db, case_ref=case_ref, user_id=current_user.id)
    if case is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found",
        )
    return CaseResponse.model_validate(case)
