"""
NyaySetu — Intake Schemas
- Validates uploaded file type and size
- Constrains voice/text input length
- Enforces legal aid eligibility question format
"""

from typing import Literal, Optional

from pydantic import BaseModel, Field


class IntakeRequest(BaseModel):
    """
    Metadata sent alongside the file upload.
    The actual file is handled via FastAPI's UploadFile.
    """
    language: Literal["en", "hi", "mr", "ta", "te", "bn", "gu", "kn"] = Field(
        default="hi", description="User's preferred language"
    )
    voice_text: Optional[str] = Field(
        None,
        max_length=2000,
        description="Transcribed voice note or additional text context",
    )

    # ── Legal Aid Eligibility (Section 12) ──
    annual_income_band: Optional[Literal[
        "below_threshold", "above_threshold", "unknown"
    ]] = None
    category_flags: Optional[list[Literal[
        "woman", "child", "sc_st", "disability", "industrial_workman", "none"
    ]]] = Field(default=None, max_length=6)
    dispute_nature: Optional[str] = Field(None, max_length=200)


class IntakeResponse(BaseModel):
    """Response after submitting a document for triage."""
    case_ref: str
    status: str
    message: str


# ── File validation constants (used in the endpoint, not the schema) ──
ALLOWED_MIME_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/webm",
}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB
