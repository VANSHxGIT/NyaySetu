"""
NyaySetu — Case Schemas
- Response models for case data
- Ensures only safe, structured data is returned to users
"""

from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel


class ExtractionData(BaseModel):
    """Structured extraction from Agent 2."""
    sender: Optional[str] = None
    recipient: Optional[str] = None
    forum_or_jurisdiction: Optional[str] = None
    statutory_sections: Optional[list[str]] = None
    claim_amount_inr: Optional[float] = None
    urgent_deadline: Optional[str] = None
    source_quotes: Optional[list[str]] = None


class RoutingData(BaseModel):
    """Routing decision from Agent 3."""
    legal_aid_eligible: Optional[bool] = None
    legal_aid_reason: Optional[str] = None
    lok_adalat_fit: Optional[str] = None  # high, medium, low
    lok_adalat_reason: Optional[str] = None
    recommended_next_forum: Optional[str] = None


class CaseResponse(BaseModel):
    """Full case response — user sees only their own cases."""
    id: int
    case_ref: str
    document_type: Optional[str] = None
    language: str
    status: str
    extraction: Optional[dict[str, Any]] = None
    routing: Optional[dict[str, Any]] = None
    citizen_summary: Optional[str] = None
    paralegal_brief: Optional[str] = None
    missing_documents: Optional[list[Any]] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class CaseListResponse(BaseModel):
    """Paginated list of cases."""
    cases: list[CaseResponse]
    total: int
    page: int
    per_page: int
