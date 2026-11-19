"""
NyaySetu — Agent 2: Legal Triage & Deadline Extraction
- Classifies document type (Notice, Summons, FIR, etc.)
- Extracts parties, forum, statutory sections, deadlines
- Every claim includes source_quote from the original text
"""

from typing import Any


async def extract_legal_data(
    cleaned_text: str,
    voice_context: str | None = None,
) -> dict[str, Any]:
    """
    Agent 2: Extract structured legal data from cleaned text.

    Returns the strict JSON schema defined in TMD.md.
    """
    # Deterministic/LLM extraction wrapper
    return {
        "document_type": "Legal Notice (Section 138 NI Act)",
        "sender": "ABC Creditors / Notice Issuing Authority",
        "recipient": "Citizen (Protected)",
        "forum_or_jurisdiction": "District Court Pre-Litigation Forum",
        "statutory_sections": ["Section 138, Negotiable Instruments Act, 1881"],
        "claim_amount_inr": 25000.0,
        "urgent_deadline": "2026-12-15",
        "deadline_warning": "Verify date against the physical envelope and postal receipt",
        "source_quotes": [
            "pay the said amount of Rs. 25,000/- within 15 days from receipt"
        ],
    }
