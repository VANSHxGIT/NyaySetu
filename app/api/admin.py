"""
NyaySetu — Admin Endpoints (Locked Behind require_admin)
- All routes require admin role in JWT
- Admin account created via CLI only (no public registration)
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import require_admin
from app.crud.cases import get_user_cases
from app.crud.telemetry import get_telemetry_summary
from app.crud.users import get_all_users, get_user_by_email
from app.models.user import User
from app.schemas.admin import TelemetrySummary, UserAdminView

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    dependencies=[Depends(require_admin)],  # ALL routes locked
)


@router.get("/users", response_model=list[UserAdminView])
async def list_users(
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """List all users (admin only)."""
    users = await get_all_users(db)
    result = []
    for user in users:
        _, total_cases = await get_user_cases(db, user.id, page=1, per_page=1)
        view = UserAdminView(
            id=user.id,
            email=user.email,
            role=user.role,
            language=user.language,
            is_active=user.is_active,
            failed_login_attempts=user.failed_login_attempts,
            locked_until=user.locked_until,
            created_at=user.created_at,
            total_cases=total_cases,
        )
        result.append(view)
    return result


@router.get("/telemetry", response_model=TelemetrySummary)
async def telemetry_dashboard(
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Aggregated pilot metrics dashboard (admin only)."""
    summary = await get_telemetry_summary(db)
    return TelemetrySummary(**summary)


@router.post("/unlock-user")
async def unlock_user(
    email: str = Query(...),
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Unlock a locked-out user account (admin only)."""
    user = await get_user_by_email(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    user.failed_login_attempts = 0
    user.locked_until = None
    await db.flush()
    return {"message": f"User {email} unlocked successfully"}
