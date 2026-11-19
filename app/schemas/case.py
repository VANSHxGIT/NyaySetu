"""
NyaySetu — Case Schemas
- Response models for case data
- Ensures only safe, structured data is returned to users
"""

from datetime import datetime
from typing import Any

from pydantic import BaseModel


class ExtractionData(BaseModel):
    """Structured extraction from Agent 2."""
    sender: str | None = None
    recipient: str | None = None
    forum_or_jurisdiction: str | None = None
    statutory_sections: list[str] | None = None
    claim_amount_inr: float | None = None
    urgent_deadline: str | None = None
    source_quotes: list[str] | None = None


class RoutingData(BaseModel):
    """Routing decision from Agent 3."""
    legal_aid_eligible: bool | None = None
    legal_aid_reason: str | None = None
    lok_adalat_fit: str | None = None  # high, medium, low
    lok_adalat_reason: str | None = None
    recommended_next_forum: str | None = None


class CaseResponse(BaseModel):
    """Full case response — user sees only their own cases."""
    id: int
    case_ref: str
    document_type: str | None = None
    language: str
    status: str
    extraction: dict[str, Any] | None = None
    routing: dict[str, Any] | None = None
    citizen_summary: str | None = None
    paralegal_brief: str | None = None
    missing_documents: list[Any] | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class CaseListResponse(BaseModel):
    """Paginated list of cases."""
    cases: list[CaseResponse]
    total: int
    page: int
    per_page: int
