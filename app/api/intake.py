"""
NyaySetu — Document Intake Endpoint
- Accepts file upload (image/PDF/audio) + metadata
- Validates file MIME type
- Enforces 10 MB size limit
- Triggers the 4-agent triage pipeline
"""

import time

import bleach
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.agents.pipeline import run_triage_pipeline
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.crud.cases import create_case, update_case_triage
from app.crud.telemetry import log_telemetry_event
from app.models.user import User
from app.schemas.intake import ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES, IntakeResponse

router = APIRouter(prefix="/intake", tags=["Document Intake"])


def _sanitize_text(text: str | None) -> str | None:
    """Strip HTML/script injection from user text input."""
    if text is None:
        return None
    return bleach.clean(text, tags=[], strip=True).strip()


@router.post("/upload", response_model=IntakeResponse)
async def upload_document(
    file: UploadFile = File(..., description="Legal document (image/PDF/audio)"),
    language: str = Form(default="hi"),
    voice_text: str | None = Form(default=None),
    annual_income_band: str | None = Form(default=None),
    dispute_nature: str | None = Form(default=None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Upload a legal document for AI-powered triage.

    Security:
    - File type validated via MIME type
    - File size capped at 10 MB
    - Text inputs sanitized (no HTML/scripts)
    - Case created under the authenticated user's ID only
    """
    # ── Validate file MIME type ──
    content_type = file.content_type or "application/octet-stream"
    if content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"File type '{content_type}' is not supported. "
            f"Allowed: {', '.join(sorted(ALLOWED_MIME_TYPES))}",
        )

    # ── Validate file size ──
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE_BYTES // (1024*1024)} MB.",
        )

    # ── Validate language ──
    valid_languages = {"en", "hi", "mr", "ta", "te", "bn", "gu", "kn"}
    if language not in valid_languages:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Unsupported language: {language}",
        )

    # ── Sanitize text inputs ──
    clean_voice_text = _sanitize_text(voice_text)
    clean_dispute = _sanitize_text(dispute_nature)

    # ── Create case under authenticated user ──
    case = await create_case(db, user_id=current_user.id, language=language)

    # ── Run triage pipeline ──
    start_time = time.monotonic()
    try:
        result = await run_triage_pipeline(
            file_content=contents,
            file_type=content_type,
            language=language,
            voice_text=clean_voice_text,
            annual_income_band=annual_income_band,
            dispute_nature=clean_dispute,
        )

        # Update case with results
        await update_case_triage(
            db=db,
            case=case,
            document_type=result.get("document_type", "Unknown"),
            extraction=result.get("extraction", {}),
            routing=result.get("routing", {}),
            citizen_summary=result.get("citizen_summary", ""),
            paralegal_brief=result.get("paralegal_brief", ""),
            missing_documents=result.get("missing_documents", []),
        )

        triage_duration = time.monotonic() - start_time

        # ── Log anonymized telemetry ──
        await log_telemetry_event(
            db=db,
            document_type=result.get("document_type", "Unknown"),
            language=language,
            triage_duration_seconds=round(triage_duration, 2),
            routing_decision=result.get("routing", {}).get(
                "recommended_next_forum", "unknown"
            ),
        )

        return IntakeResponse(
            case_ref=case.case_ref,
            status="completed",
            message="Document triaged successfully.",
        )

    except Exception:
        case.status = "failed"
        await db.flush()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Triage processing failed. Please try again.",
        )
