"""
NyaySetu — Admin Schemas
- Admin-only endpoints for user management and dashboard
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class AdminCreateRequest(BaseModel):
    """Create an admin account (CLI only, requires ADMIN_SECRET)."""
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    admin_secret: str = Field(..., description="Must match ADMIN_SECRET from .env")


class UserAdminView(BaseModel):
    """Admin view of a user (more fields than self-view)."""
    id: int
    email: str
    role: str
    language: str
    is_active: bool
    failed_login_attempts: int
    locked_until: Optional[datetime] = None
    created_at: datetime
    total_cases: int = 0

    model_config = {"from_attributes": True}


class TelemetrySummary(BaseModel):
    """Aggregated pilot metrics for the admin dashboard."""
    total_cases_triaged: int
    median_triage_time_seconds: float
    avg_comprehension_pre: float
    avg_comprehension_post: float
    pct_routed_lok_adalat: float
    pct_eligible_legal_aid: float
