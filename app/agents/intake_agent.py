"""
NyaySetu — Agent 1: Vernacular Intake & PII Masking
- OCR for scanned documents (images/PDFs)
- Voice note transcription
- PII redaction: Aadhaar, PAN, phone, bank account numbers
"""

import re
from typing import Any, Optional


# ── PII Redaction Patterns ──
PII_PATTERNS = [
    # Aadhaar: 12 digits in groups of 4
    (r"\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b", "[AADHAAR-REDACTED]"),
    # PAN: 5 letters + 4 digits + 1 letter
    (r"\b[A-Z]{5}\d{4}[A-Z]\b", "[PAN-REDACTED]"),
    # Indian phone: +91 or 0 followed by 10 digits
    (r"(?:\+91[\s-]?|0)?[6-9]\d{9}\b", "[PHONE-REDACTED]"),
    # Bank account: 9-18 digits
    (r"\b\d{9,18}\b(?=.*(?:account|a/c|acc))", "[BANK-ACCT-REDACTED]"),
    # Email addresses
    (r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", "[EMAIL-REDACTED]"),
]


def redact_pii(text: str) -> str:
    """Apply all PII redaction patterns to the text."""
    redacted = text
    for pattern, replacement in PII_PATTERNS:
        redacted = re.sub(pattern, replacement, redacted, flags=re.IGNORECASE)
    return redacted


async def process_intake(
    file_content: bytes,
    file_type: str,
    language: str,
    voice_text: Optional[str] = None,
) -> dict[str, Any]:
    """
    Agent 1: Process uploaded document and voice note.

    Steps:
    1. OCR the document (or extract text from PDF)
    2. Transcribe voice note if provided
    3. Redact all PII before downstream processing
    """
    # Placeholder for vision-language model / pytesseract OCR
    raw_text = "[Extracted Document Text: Notice regarding pending legal matter]"
    ocr_confidence = 0.90

    # Redact voice context if provided
    voice_context = None
    if voice_text:
        voice_context = redact_pii(voice_text)

    # Redact all PII from document text
    cleaned_text = redact_pii(raw_text)

    return {
        "cleaned_text": cleaned_text,
        "voice_context": voice_context,
        "ocr_confidence": ocr_confidence,
        "language_detected": language,
    }
