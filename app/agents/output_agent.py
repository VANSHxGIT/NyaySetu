"""
NyaySetu — Agent 4: Dual Output Synthesis
- Citizen-facing vernacular summary (plain language)
- Paralegal 1-page case brief (structured markdown)
- Mandatory disclaimer: not legal advice
"""

from typing import Any

DISCLAIMER_EN = (
    "⚠️ Disclaimer: NyaySetu provides legal information, triage, and procedural "
    "preparation — not formal legal representation. Please consult a licensed "
    "advocate or DLSA helpdesk for formal counsel."
)

DISCLAIMER_HI = (
    "⚠️ अस्वीकरण: न्यायSetu कानूनी जानकारी, ट्रायज और प्रक्रियात्मक तैयारी "
    "प्रदान करता है — औपचारिक कानूनी प्रतिनिधित्व नहीं। कृपया कानूनी सलाह के लिए "
    "किसी लाइसेंस प्राप्त अधिवक्ता अथवा DLSA से संपर्क करें।"
)


async def generate_outputs(
    extraction: dict[str, Any],
    routing: dict[str, Any],
    language: str = "hi",
) -> dict[str, Any]:
    """
    Agent 4: Generate citizen summary and paralegal brief.
    """
    disclaimer = DISCLAIMER_HI if language == "hi" else DISCLAIMER_EN

    doc_type = extraction.get("document_type", "Legal Notice")
    deadline = extraction.get("urgent_deadline", "Check document")
    fit = routing.get("lok_adalat_fit", "medium")

    if language == "hi":
        citizen_summary = (
            f"यह दस्तावेज़ एक '{doc_type}' प्रतीत होता है।\\n\\n"
            f"• महत्वपूर्ण समयसीमा: {deadline}\\n"
            f"• लोक अदालत / सुलह संभावना: {fit.upper()}\\n"
            f"• अगली कार्रवाई: सभी प्रासंगिक कागजात एकत्र कर लोक अदालत अथवा कानूनी सहायता केंद्र में संपर्क करें।\\n\\n"
            f"{disclaimer}"
        )
    else:
        citizen_summary = (
            f"This document is classified as a '{doc_type}'.\\n\\n"
            f"• Critical Deadline: {deadline}\\n"
            f"• Lok Adalat / Settlement Suitability: {fit.upper()}\\n"
            f"• Next Action: Gather supporting receipts/records and visit the DLSA clinic or Lok Adalat bench.\\n\\n"
            f"{disclaimer}"
        )

    sections_str = ", ".join(extraction.get("statutory_sections", [])) or "None extracted"
    quotes_str = "\\n".join(f"> {q}" for q in extraction.get("source_quotes", [])) or "None cited"

    paralegal_brief = (
        f"# Paralegal Triage Brief — न्यायSetu\\n\\n"
        f"**Case Classification:** {doc_type}\\n"
        f"**Statutory Sections:** {sections_str}\\n\\n"
        f"## Parties\\n"
        f"- **Sender / Complainant:** {extraction.get('sender', 'N/A')}\\n"
        f"- **Respondent / Citizen:** {extraction.get('recipient', 'Citizen (Protected)')}\\n"
        f"- **Forum:** {extraction.get('forum_or_jurisdiction', 'N/A')}\\n\\n"
        f"## Urgent Limitation & Deadlines\\n"
        f"- **Next Hearing / Reply Due:** {deadline}\\n"
        f"- **Warning:** {extraction.get('deadline_warning', 'Verify postal receipt date')}\\n\\n"
        f"## Grounding Evidence (Verbatim Snippets)\\n"
        f"{quotes_str}\\n\\n"
        f"## Routing Assessment\\n"
        f"- **Legal Aid (Sec. 12):** {routing.get('legal_aid_reason', 'N/A')}\\n"
        f"- **Lok Adalat Suitability:** {routing.get('lok_adalat_reason', 'N/A')}\\n"
        f"- **Recommended Forum:** {routing.get('recommended_next_forum', 'District Court')}\\n\\n"
        f"---\\n{disclaimer}"
    )

    missing_docs = [
        "Government-issued photo identification (Aadhaar / Voter ID)",
        "Envelope or postal tracking receipt showing date notice was delivered",
        "Original or photocopy of disputed document / cheque / challan",
        "Proof of income / BPL card (if applying for Section 12 free legal aid)",
    ]

    return {
        "citizen_summary": citizen_summary,
        "paralegal_brief": paralegal_brief,
        "missing_documents": missing_docs,
    }
